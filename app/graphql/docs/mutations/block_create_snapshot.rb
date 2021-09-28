# frozen_string_literal: true
module Docs
  class Mutations::BlockCreateSnapshot < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true

    def resolve(id:)
      block = Docs::Block.non_deleted.find(id)

      block.save_snapshot!

      nil
    end
  end
end
