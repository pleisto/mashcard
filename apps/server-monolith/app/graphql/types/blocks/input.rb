# frozen_string_literal: true

module Types
  module Blocks
    class Input < BaseInputObject
      graphql_name 'BlockInput'
      argument :id, Scalars::UUID, 'block unique id', required: true
      argument :type, String, description_same(BaseObject, :type), required: true

      argument :attachments, [String], 'attachments', required: false
      argument :content, [GraphQL::Types::JSON], 'content', required: true
      argument :data, GraphQL::Types::JSON, 'data', required: false
      argument :meta, GraphQL::Types::JSON, 'meta', required: false
      argument :parent_id, Scalars::UUID, description_same(BaseObject, :parent_id),
        required: false
      argument :sort, GraphQL::Types::BigInt, description_same(BaseObject, :sort), required: false
      argument :text, String, 'text', required: true
    end
  end
end
