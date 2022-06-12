# frozen_string_literal: true

module Docs
  module Inputs
    class BlockInput < BrickGraphQL::BaseInputObject
      argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
      argument :type, String, description_same(Objects::BlockBaseObject, :type), required: true

      argument :attachments, [String], 'attachments', required: false
      argument :content, [GraphQL::Types::JSON], 'content', required: true
      argument :data, GraphQL::Types::JSON, 'data', required: false
      argument :meta, GraphQL::Types::JSON, 'meta', required: false
      argument :parent_id, BrickGraphQL::Scalars::UUID, description_same(Objects::BlockBaseObject, :parent_id),
        required: false
      argument :sort, GraphQL::Types::BigInt, description_same(Objects::BlockBaseObject, :sort), required: false
      argument :text, String, 'text', required: true
    end
  end
end
