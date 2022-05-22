# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class Formula < BrickGraphQL::BaseObject
      has_primary_key uuid: true
      field :block_id, BrickGraphQL::Scalars::UUID, 'block id', null: false
      field :cache_value, GraphQL::Types::JSON, 'dump value', null: false
      field :created_at, Integer, 'created at', null: false
      field :definition, String, 'formula definition', null: false
      field :meta, GraphQL::Types::JSON, 'meta', null: false
      field :name, String, 'formula name', null: false
      field :type, String, 'type', null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
      field :version, Integer, 'version', null: false
    end
  end
end
