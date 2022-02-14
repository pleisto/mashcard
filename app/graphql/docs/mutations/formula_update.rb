# frozen_string_literal: true
module Docs
  class Mutations::FormulaUpdate < BrickGraphQL::BaseMutation
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true
    argument :name, String, 'name', required: false
    argument :definition, String, 'definition', required: false
    argument :cache_value, GraphQL::Types::JSON, 'dump value', required: false
    argument :version, Integer, 'version', required: false
    argument :type, String, 'type', required: false

    def resolve(args)
      formula = Docs::Formula.find_by!(id: args[:id], block_id: args[:block_id])

      update_params = {
        name: args[:name],
        definition: args[:definition],
        view: args[:view],
        cache_value: args[:cache_value],
        version: args[:version]
      }.compact
      formula.update!(update_params)

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
