# frozen_string_literal: true
module Docs
  class Objects::BlockBaseObject < BrickGraphQL::BaseObject
    has_primary_key uuid: true
    field :type, String, 'block type', null: false
    field :parent_id, BrickGraphQL::Scalars::UUID, 'parent uuid', null: true
    field :parent_type, String, 'parent type', null: true
    field :sort, GraphQL::Types::BigInt, 'block sort', null: false
    field :collaborators, [Accounts::Objects::User], 'collaborators', null: true
    field :next_sort, GraphQL::Types::BigInt, 'block next sort', null: false
    field :first_child_sort, GraphQL::Types::BigInt, 'block first child sort', null: false
    field :blobs, [System::Objects::Blob], 'blobs', null: true

    expose_permissions_field :show?
  end
end
