# frozen_string_literal: true
module Docs
  class Mutations::BlockRestore < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true

    def resolve(id:)
      block = Docs::Block.find(id)
      block.restore!

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
