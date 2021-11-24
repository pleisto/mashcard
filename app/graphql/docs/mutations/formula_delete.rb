# frozen_string_literal: true
module Docs
  class Mutations::FormulaDelete < BrickGraphQL::BaseMutation
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :id, BrickGraphQL::Scalars::UUID, 'id', required: true

    def resolve(args)
      formula = Docs::Formula.find_by!(id: args[:id], block_id: args[:block_id])

      formula.destroy
      nil
    end
  end
end
