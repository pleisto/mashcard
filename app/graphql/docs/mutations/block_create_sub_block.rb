# frozen_string_literal: true
module Docs
  class Mutations::BlockCreateSubBlock < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :title, String, 'title', required: true

    def resolve(id:, title:)
      block = Docs::Block.non_deleted.find(id)

      block.create_sub_block!(title)

      nil
    end
  end
end
