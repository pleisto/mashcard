# frozen_string_literal: true
module Docs
  class Mutations::BlockSyncBatch < BrickGraphQL::BaseMutation
    argument :blocks, [Inputs::BlockInput], required: true
    argument :root_id, BrickGraphQL::Scalars::UUID, 'block root id', required: true
    argument :operator_id, String, 'operator id', required: true

    field :refetch_tree, Boolean, null: false

    def resolve(blocks:, root_id:, operator_id:)
      lock = Redis::Lock.new("sync_batch:#{root_id}", expiration: 15, timeout: 3)
      lock.lock do
        Rails.logger.info("resolve #{root_id} #{operator_id} #{blocks}")
        do_resolve(blocks: blocks, root_id: root_id, operator_id: operator_id)
      end
    end

    def do_resolve(blocks:, root_id:, operator_id:)
      root = Docs::Block.find_by(id: root_id)
      refetch_tree = false
      refetch_tree = true if root.nil?

      if root&.deleted_at
        raise BrickGraphQL::Errors::ArgumentError, :cannot_modify_deleted_blocks
      end

      patches = []
      new_blocks_hash = {}
      preloads = {}

      if root
        preloads = root.descendants(unscoped: true).index_by(&:id)
        paths_cache = root.paths_cache
        delete_block_ids = preloads.select { |_, v| !v.deleted_at }.keys - blocks.map(&:id)
        if delete_block_ids.present?
          patches += delete_block_ids.map { |id| { id: id, path: paths_cache.fetch(id), payload: {}, patch_type: "DELETE" } }
          preloads = preloads.each_with_object({}) do |(id, b), h|
            b.soft_delete! if id.in?(delete_block_ids)
            h[id] = b
          end
        end
      end

      pod_id = current_pod.fetch('id')

      blocks.each do |args|
        block = preloads[args.id] || Docs::Block.new(id: args.id)

        block.page = true if block.id == root_id
        block.text = args.text
        block.content = args.content
        block.sort = args.sort.to_i
        block.data = args.data
        block.meta = args.meta
        block.parent_id ||= args.parent_id
        block.type ||= args.type
        block.pod_id ||= pod_id
        block.root_id ||= root_id

        block.attachments = args.attachments if args.attachments

        block.deleted_at = nil

        # TODO: fix this in collab (Readonly mode)
        block.collaborators = (block.collaborators + [current_user.id]).uniq if current_pod.fetch('owner_id') == current_user.id

        refetch_tree = true if args.id == root_id && block.changed?

        block.save!
        new_blocks_hash[block.id] = block

        patches << block.dirty_patch
      end

      patches.compact!

      root ||= new_blocks_hash.fetch(root_id)
      root.maybe_save_snapshot!

      if patches.present?
        ## NOTE dirty data
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

      {
        refetch_tree: refetch_tree
      }
    end
  end
end
