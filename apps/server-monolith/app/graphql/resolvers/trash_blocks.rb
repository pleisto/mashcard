# frozen_string_literal: true

module Resolvers
  class TrashBlocks < BaseResolver
    type [Types::Block], null: true

    argument :block_id, Scalars::UUID, required: false
    argument :domain, GraphQL::Types::String, required: true
    argument :search, GraphQL::Types::String, required: false

    def resolve(args)
      domain = args[:domain]
      block_id = args[:block_id]
      search = args[:search]

      blocks =
        if block_id
          Docs::Block.find(block_id).descendants_raw(unscoped: true).soft_deleted.pageable
        else
          Docs::Block.soft_deleted.joins(:pod).pageable.where(pod: { domain: domain })
        end

      blocks = blocks.where('text like ?', "%#{search}%") if search.present?

      result = blocks.to_a

      target_blocks = blocks.select { |block| !block.parent_id.nil? }
      target_blocks_ids = target_blocks.map(&:id)

      todo_parent_ids = target_blocks.map(&:parent_id).uniq
      parent_path_array = Docs::Block.where(id: todo_parent_ids).all.each_with_object({}) do |block, hash|
        hash[block.id] = block.parent_path_array
      end

      final_result = []

      result.each do |block|
        if block.id.in?(target_blocks_ids)
          temp_array = parent_path_array[block.parent_id]
          next if temp_array.nil?

          block.parent_path_array_value = temp_array
        end
        final_result << block
      end

      final_result.sort_by(&:deleted_at).reverse
    end
  end
end
