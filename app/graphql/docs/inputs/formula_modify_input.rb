# frozen_string_literal: true
module Docs
  class Inputs::FormulaModifyInput < BrickGraphQL::BaseInputObject
    argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :name, String, 'name', required: true
    argument :definition, String, 'definition', required: true
    argument :cache_value, GraphQL::Types::JSON, 'dump value', required: true
    argument :version, Integer, 'version', required: true
    argument :type, String, 'type', required: true
    argument :meta, GraphQL::Types::JSON, 'meta', required: true
  end
end
