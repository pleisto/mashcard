# frozen_string_literal: true
module Docs
  class Inputs::FormulaDeleteInput < BrickGraphQL::BaseInputObject
    argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
  end
end
