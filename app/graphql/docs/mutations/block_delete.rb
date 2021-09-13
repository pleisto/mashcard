# frozen_string_literal: true
module Docs
  class Mutations::BlockDelete < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true

    def resolve(id:)
      block = Docs::Block.find(id)
      block.deleted_at = Time.now
      block.save

      block.delete_pages!

      nil
    end
  end
end
