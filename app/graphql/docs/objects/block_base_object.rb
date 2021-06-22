# frozen_string_literal: true
module Docs
  class Objects::BlockBaseObject < BrickGraphQL::BaseObject
    global_id_field :id
    field :type, String, 'block type', null: false
    field :parent_id, String, 'parent uuid', null: true
    field :parent_type, String, 'parent type', null: true
    field :children, [String], 'children block uuids', null: true
    field :children_blocks, [GraphQL::Types::JSON], 'children block', null: true
    field :collaborators, [Accounts::Objects::User], 'collaborators', null: true

    def self.create_object(&block)
      Class.new(BrickGraphQL::BaseObject, &block)
    end
  end
end
