# frozen_string_literal: true

module Docs
  class Queries::PageBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :webid, GraphQL::Types::String, required: true,
             description: 'List all pages for pod webid'

    def resolve(webid:)
      blocks = Docs::Block.joins(:pod).pageable.where(pod: { webid: webid }).includes(:enabled_share_links).to_a

      blocks = Docs::Block.fill_sorts(webid, blocks)

      roots = blocks.select { |block| block.parent_id.nil? }
      result = authorized_scope roots, as: :collaborating, with: Docs::BlockPolicy
      target = result

      loop do
        break if result.blank?
        parent_ids = result.map(&:id)
        result = blocks.select { |block| block.parent_id.in?(parent_ids) }
        target += result
      end

      target
    end
  end
end
