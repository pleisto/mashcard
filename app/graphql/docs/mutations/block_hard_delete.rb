# frozen_string_literal: true
module Docs
  class Mutations::BlockHardDelete < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true

    def resolve(id:)
      block = Docs::Block.unscoped.find(id)
      block.hard_delete!

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
