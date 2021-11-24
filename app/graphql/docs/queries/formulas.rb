# frozen_string_literal: true

module Docs
  class Queries::Formulas < BrickGraphQL::BaseResolver
    type [Docs::Objects::Formula], null: true

    argument :webid, GraphQL::Types::String, required: true,
             description: 'List all formulas for pod webid'

    def resolve(webid:)
      Docs::Formula.joins(:pod).where(pod: { webid: webid }).to_a.map do |f|
        f.attributes.merge('created_at' => f.created_at.to_i)
      end
    end
  end
end
