# frozen_string_literal: true
module Docs
  class Mutations::FormulaCreate < BrickGraphQL::BaseMutation
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true
    argument :name, String, 'name', required: true
    argument :definition, String, 'definition', required: true
    argument :view, GraphQL::Types::JSON, 'view', required: false
    argument :dependency_ids, [BrickGraphQL::Scalars::UUID], 'dependencies', required: true
    argument :cache_value, GraphQL::Types::JSON, 'dump value', required: false

    def resolve(args)
      Docs::Formula.create!(args.to_h)

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
