# typed: strict
# frozen_string_literal: true

module System
  module Objects
    class SpaceMember < BrickGraphQL::BaseObject
      graphql_name 'space_member'
      has_primary_key

      field :avatar_data, Avatar, 'Space Avatar', null: true
      field :domain, String, 'Like a username, Unique within this instance of Brickdoc', null: false
      field :email, String, 'owner email', null: true
      field :name, String, 'Space Name', null: false

      field :role, Enums::MemberRole, 'role', null: false
      field :state, Enums::MemberState, 'state', null: false
    end
  end
end
