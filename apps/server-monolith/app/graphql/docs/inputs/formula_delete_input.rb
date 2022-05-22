# typed: strict
# frozen_string_literal: true

module Docs
  module Inputs
    class FormulaDeleteInput < BrickGraphQL::BaseInputObject
      argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
      argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true
    end
  end
end
