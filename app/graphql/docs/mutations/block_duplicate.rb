# frozen_string_literal: true
module Docs
  class Mutations::BlockDuplicate < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true

    field :id, BrickGraphQL::Scalars::UUID, null: false
    field :formula_ids, [BrickGraphQL::Scalars::UUID], null: false

    def resolve(id:)
      block = Docs::Block.find(id)
      block.duplicate!
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
