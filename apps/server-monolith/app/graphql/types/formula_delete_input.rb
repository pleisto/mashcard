# frozen_string_literal: true

module Types
  class FormulaDeleteInput < BaseInputObject
    argument :block_id, Scalars::UUID, 'block id', required: true
    argument :id, Scalars::UUID, 'id', required: true
  end
end
