# frozen_string_literal: true

module Resolvers
  class BlockSearch < BaseResolver
    type [Types::Block], null: true

    argument :domain, GraphQL::Types::String, required: true, description: 'domain'
    argument :input, GraphQL::Types::String, required: true, description: 'input'

    def resolve(domain:, input:)
      if input.blank?
        Docs::Block.non_deleted.joins(:pod).where(pod: { domain: domain }).pageable
      else
        Docs::Block.non_deleted.joins(:pod).where(pod: { domain: domain }).where('text like ?', "%#{input}%")
      end
    end
  end
end
