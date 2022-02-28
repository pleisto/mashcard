# frozen_string_literal: true

module Docs
  class Queries::Formulas < BrickGraphQL::BaseResolver
    type [Docs::Objects::Formula], null: true

    argument :domain, GraphQL::Types::String, required: true,
             description: 'List all formulas for space domain'
    argument :ids, GraphQL::Types::String, required: false

    def resolve(args)
      query = Docs::Formula.joins(:space).where(space: { domain: args[:domain] })
      if args[:ids]
        query = query.where(id: args[:ids].split(','))
      end

      query.to_a.map do |f|
        f.attributes.merge('created_at' => f.created_at.to_i)
      end
    end
  end
end
