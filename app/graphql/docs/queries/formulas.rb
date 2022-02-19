# frozen_string_literal: true

module Docs
  class Queries::Formulas < BrickGraphQL::BaseResolver
    type [Docs::Objects::Formula], null: true

    argument :domain, GraphQL::Types::String, required: true,
             description: 'List all formulas for space domain'

    def resolve(domain:)
      Docs::Formula.joins(:space).where(space: { domain: domain }).to_a.map do |f|
        f.attributes.merge('created_at' => f.created_at.to_i)
      end
    end
  end
end
