# frozen_string_literal: true
module Docs
  class Objects::BlockSnapshot < BrickGraphQL::BaseObject
    has_primary_key
    field :snapshot_version, Int, 'Snapshot version', null: false
    field :name, String, 'Snapshot name', null: false
  end
end
