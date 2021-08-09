# frozen_string_literal: true
module Docs
  class Mutations::BlockSyncBatch < BrickGraphQL::BaseMutation
    argument :blocks, [Inputs::BlockInput], required: true
    argument :root_id, BrickGraphQL::Scalars::UUID, 'block root id', required: true
    argument :operator_id, String, 'operator id', required: true

    def resolve(blocks:, root_id:, operator_id:)
      lock = Redis::Lock.new("sync_batch:#{root_id}", expiration: 15, timeout: 3)
      lock.lock do
        Rails.logger.info("resolve #{root_id} #{operator_id} #{blocks}")
        do_resolve(blocks: blocks, root_id: root_id, operator_id: operator_id)
      end
    end

    def do_resolve(blocks:, root_id:, operator_id:)
      root = Docs::Block.find_by(id: root_id)
      patches = []
      new_blocks_hash = {}
      preloads = {}

      if root
        preloads = root.descendants_cache(unscoped: true).index_by(&:id)
        paths_cache = root.paths_cache
        delete_block_ids = preloads.select { |_, v| !v.deleted_at }.keys - blocks.map(&:id)
        if delete_block_ids.present?
          patches += delete_block_ids.map { |id| { id: id, path: paths_cache.fetch(id), payload: "null", patch_type: "DELETE" } }
          Docs::Block.where(id: delete_block_ids).update_all(deleted_at: Time.current)
        end
      end

      pod_id = current_pod.fetch('id')

      blocks.each do |args|
        block = preloads[args.id] || Docs::Block.new(id: args.id)

        block.sort = args.sort.to_i
        block.data = args.data
        block.meta = args.meta
        block.parent_id ||= args.parent_id
        block.type ||= args.type
        block.pod_id ||= pod_id

        block.attachments = args.attachments if args.attachments

        block.deleted_at = nil

        # TODO: fix this in collab (Readonly mode)
        block.collaborators << current_user.id if current_pod.fetch('owner_id') == current_user.id

        # valid_payload(block)

        block.save!
        new_blocks_hash[block.id] = block

        patches << block.dirty_patch
      end

      patches.compact!

      if patches.present?
        root ||= new_blocks_hash.fetch(root_id)
        if patches.any? { |p| p.fetch(:path).blank? }
          root.clear_cache
          paths_cache = root.paths_cache

          patches = patches.map do |p|
            if p.fetch(:path).blank?
              parent_id = p.fetch(:parent_id)
              # rubocop:disable Metrics/BlockNesting
              new_path = parent_id.nil? || p.fetch(:id) == root_id ? [] : paths_cache.fetch(parent_id)
              new_path += [p.fetch(:id)] if p.fetch(:patch_type) != "ADD"
              p.merge(path: new_path)
            else
              p
            end
          end
        end

        trigger_payload = {
          state: "ACTIVE",
          seq: root.patch_seq_increment,
          patches: patches.map do |p|
            p.merge(operator_id: operator_id)
          end.sort_by { |p| -p.fetch(:path).length }
        }
        Docs::Block.broadcast(root_id, trigger_payload)
      end

      nil
    end

    def valid_payload(block)
      block_type = Objects::Block.resolve_type(OpenStruct.new(type: block.type), {})
      %w(data meta).each do |payload_type|
        payload_defn = block_type.try("#{payload_type}_payload")
        # clean unsupported payload type
        if payload_defn.blank?
          block.send("#{payload_type}=", {})
          next
        end
        nonnull_payload_defn = payload_defn.select { |x| x[:opts][:null] == false }
        if nonnull_payload_defn.present? && block.send(payload_type).blank?
          raise BrickGraphQL::Errors::ArgumentError, "#{payload_type} is required"
        end
        # remove unpermitted keys
        params = ActionController::Parameters.new(block.send(payload_type))
        permit_keys = payload_defn.map { |x| x[:name] }
        block.send("#{payload_type}=", params.permit(permit_keys).as_json)

        nonnull_payload_defn.each do |f|
          if block.send(payload_type).try(:[], f[:name].to_s).in?([nil, ""])
            raise BrickGraphQL::Errors::ArgumentError, "#{payload_type}.#{f[:name]} is required"
          end
        end
      end
    end
  end
end
