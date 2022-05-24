# frozen_string_literal: true

module Docs
  module Queries
    class BlockSearch < BrickGraphQL::BaseResolver
      type [Docs::Objects::Block], null: true

      argument :domain, GraphQL::Types::String, required: true, description: 'domain'
      argument :input, GraphQL::Types::String, required: true, description: 'input'

      def resolve(domain:, input:)
        if input.blank?
          Docs::Block.non_deleted.joins(:space).where(space: { domain: domain }).pageable
        else
          Docs::Block.non_deleted.joins(:space).where(space: { domain: domain }).where('text like ?', "%#{input}%")
        end
      end
    end
  end
end
