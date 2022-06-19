# frozen_string_literal: true

module Types
  class PatchBaseObject < Types::BaseObject
    field :id, Scalars::UUID, null: false
    field :operator_id, String, null: false
    field :patch_type, Types::Patchtype, null: false
    field :path, [Scalars::UUID], null: false

    ## TODO refactor
    field :payload, GraphQL::Types::JSON, null: false
  end
end
