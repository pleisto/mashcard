# frozen_string_literal: true
module Docs
  class Inputs::BlockInput < BrickGraphQL::BaseInputObject
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
    argument :type, String, description_same(Objects::BlockBaseObject, :type), required: true

    argument :parent_id, BrickGraphQL::Scalars::UUID, description_same(Objects::BlockBaseObject, :parent_id), required: false
    argument :sort, GraphQL::Types::BigInt, description_same(Objects::BlockBaseObject, :sort), required: false
    argument :data, Inputs::BlockDataInput, "data", required: false
    argument :meta, GraphQL::Types::JSON, "meta", required: false
  end
end
