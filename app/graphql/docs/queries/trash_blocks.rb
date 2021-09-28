# frozen_string_literal: true

module Docs
  class Queries::TrashBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :webid, GraphQL::Types::String, required: true
    argument :block_id, BrickGraphQL::Scalars::UUID, required: false
    argument :search, GraphQL::Types::String, required: false

    def resolve(args)
      webid = args[:webid]
      block_id = args[:block_id]
      search = args[:search]

      blocks =
        if block_id
          Docs::Block.find(block_id).descendants_raw(unscoped: true).soft_deleted.pageable
        else
          Docs::Block.soft_deleted.joins(:pod).pageable.where(pod: { webid: webid })
        end

      blocks = blocks.where("text like ?", "%#{search}%") if search.present?

      # blocks.select { |block| block.id == block.root_id }
      result = blocks.to_a

      target_blocks = blocks.select { |block| !block.parent_id.nil? }
      target_blocks_ids = target_blocks.map(&:id)

      todo_parent_ids = target_blocks.map(&:parent_id).uniq
      parent_path_array = Docs::Block.where(id: todo_parent_ids).all.each_with_object({}) do |block, hash|
        hash[block.id] = block.parent_path_array
      end

      result.map do |block|
        if block.id.in?(target_blocks_ids)
          block.parent_path_array_value = parent_path_array.fetch(block.parent_id)
        end
        block
      end
    end
  end
end
