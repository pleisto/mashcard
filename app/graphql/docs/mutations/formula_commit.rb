# frozen_string_literal: true
module Docs
  class Mutations::FormulaCommit < BrickGraphQL::BaseMutation
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true
    argument :name, String, 'name', required: true
    argument :definition, String, 'definition', required: true
    argument :cache_value, GraphQL::Types::JSON, 'dump value', required: true
    argument :version, Integer, 'version', required: true
    argument :type, String, 'type', required: true

    def resolve(args)
      formula = Docs::Formula.find_by(id: args[:id], block_id: args[:block_id])
      if formula
        update_params = {
          name: args[:name],
          type: args[:type],
          definition: args[:definition],
          cache_value: args[:cache_value],
          version: args[:version]
        }.compact
        formula.update!(update_params)
      else
        Docs::Formula.create!(args.to_h)
      end

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
