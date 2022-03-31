# frozen_string_literal: true
module Docs
  class Mutations::BlockSoftDelete < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
    argument :hard_delete, Boolean, 'hard delete', required: true

    def resolve(id:, hard_delete:)
      block = Docs::Block.find(id)
      block.soft_delete!

      block.hard_delete! if hard_delete

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
