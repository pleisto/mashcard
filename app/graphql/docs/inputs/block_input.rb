# frozen_string_literal: true
module Docs
  class Inputs::BlockInput < BrickGraphQL::BaseInputObject
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
    argument :type, String, description_same(Objects::BlockBaseObject, :type), required: true

    argument :parent_id, BrickGraphQL::Scalars::UUID, description_same(Objects::BlockBaseObject, :parent_id), required: false
    argument :sort, GraphQL::Types::BigInt, description_same(Objects::BlockBaseObject, :sort), required: false
    argument :content, [GraphQL::Types::JSON], 'content', required: true
    argument :text, String, 'text', required: true
    argument :data, GraphQL::Types::JSON, "data", required: false
    argument :meta, GraphQL::Types::JSON, "meta", required: false
    argument :attachments, [String], 'attachments', required: false
  end
end
