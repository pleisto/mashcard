# frozen_string_literal: true
module Docs
  class Objects::Formula < BrickGraphQL::BaseObject
    has_primary_key uuid: true
    field :name, String, 'formula name', null: false
    field :block_id, BrickGraphQL::Scalars::UUID, 'block id', null: false
    field :definition, String, 'formula definition', null: false
    field :dependency_ids, [BrickGraphQL::Scalars::UUID], 'formula dependencies', null: false
    field :cache_value, GraphQL::Types::JSON, "dump value", null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
    field :created_at, Integer, 'created at', null: false
    field :level, Integer, 'level', null: false
    field :version, Integer, 'version', null: false
    field :kind, String, 'kind', null: false
  end
end
