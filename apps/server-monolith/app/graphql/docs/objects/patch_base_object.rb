# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class PatchBaseObject < BrickGraphQL::BaseObject
      field :id, BrickGraphQL::Scalars::UUID, null: false
      field :operator_id, String, null: false
      field :patch_type, Enums::Patchtype, null: false
      field :path, [BrickGraphQL::Scalars::UUID], null: false

      ## TODO refactor
      field :payload, GraphQL::Types::JSON, null: false
    end
  end
end
