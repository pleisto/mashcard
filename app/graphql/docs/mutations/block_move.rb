# frozen_string_literal: true
module Docs
  class Mutations::BlockMove < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
    argument :target_parent_id, BrickGraphQL::Scalars::UUID, 'target parent id', required: false
    argument :sort, GraphQL::Types::BigInt, description_same(Objects::BlockBaseObject, :sort), required: true

    def resolve(args)
      block = Docs::Block.non_deleted.find(args[:id])
      block.move!(args[:target_parent_id], args[:sort])

      nil
    rescue => e
      { errors: [e.message] }
    end
  end
end
