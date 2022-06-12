# frozen_string_literal: true

module Docs
  module Queries
    class PageBlocks < BrickGraphQL::BaseResolver
      type [Docs::Objects::Block], null: true

      argument :domain, GraphQL::Types::String, required: true,
        description: 'List all pages for pod domain'

      def resolve(domain:)
        blocks = Docs::Block.non_deleted.joins(:pod).pageable.where(pod: { domain: domain }).includes(:enabled_share_links).to_a

        blocks = Docs::Block.fill_sorts(domain, blocks)

        roots = blocks.select { |block| block.id == block.root_id }

        non_deleted_result = []
        parent_ids = [nil]
        loop do
          temp = roots.select { |block| block.parent_id.in?(parent_ids) }
          break if temp.blank?

          non_deleted_result += temp
          parent_ids = temp.map(&:id)
        end

        result = authorized_scope non_deleted_result, as: :collaborating, with: Docs::BlockPolicy

        Docs::Block.remove_dangling_blocks(result, blocks)
      end
    end
  end
end
