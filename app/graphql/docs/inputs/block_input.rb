# frozen_string_literal: true
module Docs
  class Inputs::BlockInput < BrickGraphQL::BaseInputObject
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
    argument :type, String, description_same(Objects::BlockBaseObject, :type), required: true,
             validates: { Validators::BlockTypeValidator => {} }

    argument :parent_id, BrickGraphQL::Scalars::UUID, description_same(Objects::BlockBaseObject, :parent_id), required: false
    argument :sort, Int, description_same(Objects::BlockBaseObject, :sort), required: false
    argument :data, Scalars::BlockData, description_same(Scalars::BlockData), required: false
    argument :meta, Scalars::BlockMeta, description_same(Scalars::BlockMeta), required: false
  end
end
