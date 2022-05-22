# typed: strict
# frozen_string_literal: true

module Docs
  module Inputs
    class FormulaModifyInput < BrickGraphQL::BaseInputObject
      argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
      argument :cache_value, GraphQL::Types::JSON, 'dump value', required: true
      argument :definition, String, 'definition', required: true
      argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true
      argument :meta, GraphQL::Types::JSON, 'meta', required: true
      argument :name, String, 'name', required: true
      argument :type, String, 'type', required: true
      argument :version, Integer, 'version', required: true
    end
  end
end
