# frozen_string_literal: true

module Mutations
  module Blocks
    class SyncBatch < ::Mutations::BaseMutation
      graphql_name 'BlockSyncBatch'
      argument :blocks, [Types::Blocks::Input], required: true
      argument :deleted_ids, [Scalars::UUID], 'deleted ids', required: true
      argument :operator_id, String, 'operator id', required: true
      argument :root_id, Scalars::UUID, 'block root id', required: true

      def resolve(blocks:, root_id:, operator_id:, deleted_ids:)
        lock = Redis::Lock.new("sync_batch:#{root_id}", expiration: 15, timeout: 10)
        lock.lock do
          do_resolve(blocks: blocks, root_id: root_id, operator_id: operator_id, deleted_ids: deleted_ids)
        end
      end

      def do_resolve(blocks:, root_id:, operator_id:, deleted_ids:)
        # temp fix before it has permission checking
        return unless current_user

        Rails.logger.info("resolve #{root_id} #{operator_id} #{deleted_ids} #{blocks}")
        root = Docs::Block.find_by(id: root_id)

        if root&.deleted_at
          return
        end

        patches = []
        new_blocks_hash = {}
        preloads = {}

        if root
          preloads = root.descendants(unscoped: true).index_by(&:id)
          paths_cache = root.paths_cache
          final_delete_ids = deleted_ids & paths_cache.keys
          if final_delete_ids.present?
            patches += final_delete_ids.map do |id|
              { id: id, path: paths_cache.fetch(id), payload: {}, patch_type: 'DELETE' }
            end
            preloads = preloads.each_with_object({}) do |(id, b), h|
              b.soft_delete! if id.in?(final_delete_ids)
              h[id] = b
            end
          end
        end

        pod_id = current_pod.fetch('id')
        current_user.save_last_position!(current_pod.fetch('username'), root_id)

        insert_data = []
        upsert_data = []
        attachment_data = {}
        now = Time.current

        blocks.each do |args|
          raise Mashcard::GraphQL::Errors::ArgumentError, :parent_id_cause_endless_loop if args.id == args.parent_id

          block = preloads[args.id]

          exist = block.present?
          block ||= Docs::Block.new(id: args.id)

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
          block.deleted_at = nil
          # TODO: fix this in collab (Readonly mode)
          block.collaborators = (block.collaborators + [current_user.id]).uniq if current_pod.fetch('id') == current_user.id

          if args.attachments
            # block.attachments = args.attachments
            attachment_data[block] = args.attachments
          end

          if exist
            upsert_data << block if block.changed?
          else
            insert_data << block
          end

          new_blocks_hash[block.id] = block
          patches << block.dirty_patch
        end

        insert_histories = []

        ## Handle insert block
        if insert_data.present?
          insert_blocks = insert_data.map do |block|
            block.block_attributes.merge('created_at' => now, 'updated_at' => now)
          end
          insert_histories_1 = insert_data.map do |block|
            block.history_attributes.merge('created_at' => now, 'updated_at' => now)
          end
          Docs::Block.insert_all(insert_blocks)
          insert_histories += insert_histories_1
        end

        ## Handle upsert block
        if upsert_data.present?
          root&.prepare_descendants

          upsert_blocks = upsert_data.map do |block|
            block.history_version = block.realtime_history_version_increment
            block
          end

          insert_histories_2 = upsert_blocks.map do |block|
            block.history_attributes.merge('created_at' => now, 'updated_at' => now)
          end

          Docs::Block.upsert_all(upsert_blocks.map(&:block_attributes))
          # rubocop:disable Lint/UselessAssignment
          insert_histories += insert_histories_2
        end

        ## Handle insert history
        # Docs::History.insert_all(insert_histories) if insert_histories.present?

        ## Handle attachment
        attachment_data.each do |block, attachment|
          block.update!(attachment: attachment)
        end

        patches.compact!

        root ||= new_blocks_hash.fetch(root_id)
        root.maybe_save_snapshot!

        # rubocop:disable Lint/LiteralAsCondition
        if false && patches.present?
          ## NOTE dirty data
          if patches.any? { |patch| patch.fetch(:path).blank? }
            root.clear_cache
            paths_cache = root.paths_cache

            patches = patches.map do |patch|
              if patch.fetch(:path).blank?
                parent_id = patch.fetch(:parent_id)
                # rubocop:disable Metrics/BlockNesting
                new_path = parent_id.nil? || patch.fetch(:id) == root_id ? [] : paths_cache.fetch(parent_id, [root_id])
                new_path += [patch.fetch(:id)] if patch.fetch(:patch_type) != 'ADD'
                patch.merge(path: new_path)
              else
                patch
              end
            end
          end

          trigger_payload = {
            state: 'ACTIVE',
            seq: root.patch_seq_increment,
            patches: patches.map do |p|
              p.merge(operator_id: operator_id)
            end.sort_by { |p| -p.fetch(:path).length },
          }
          Docs::Block.broadcast(root_id, trigger_payload)
        end

        nil
      end
    end
  end
end
