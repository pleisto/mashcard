# frozen_string_literal: true
module Docs
  class Objects::Formula < BrickGraphQL::BaseObject
    has_primary_key uuid: true
    field :name, String, 'formula name', null: false
    field :block_id, BrickGraphQL::Scalars::UUID, 'block id', null: false
    field :definition, String, 'formula definition', null: false
    field :cache_value, GraphQL::Types::JSON, "dump value", null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
    field :created_at, Integer, 'created at', null: false
    field :version, Integer, 'version', null: false
    field :type, String, 'type', null: false
    field :meta, GraphQL::Types::JSON, 'meta', null: false
  end
end
