# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class BlockSnapshot < BrickGraphQL::BaseObject
      has_primary_key
      field :created_at, GraphQL::Types::ISO8601DateTime, 'created at', null: false
      field :name, String, 'Snapshot name', null: false
      field :relative_time, String, 'relative time', null: false
      field :snapshot_version, Int, 'Snapshot version', null: false
    end
  end
end
