# frozen_string_literal: true
module System
  module Objects
    class PodMember < BrickGraphQL::BaseObject
      graphql_name 'pod_member'
      has_primary_key

      field :webid, String, 'Like a username, Unique within this instance of Brickdoc', null: false
      field :name, String, 'Pod Name', null: false
      field :email, String, 'owner email', null: false
      field :avatar_data, Avatar, 'Pod Avatar', null: true

      field :role, Enums::MemberRole, 'role', null: false
      field :state, Enums::MemberState, 'state', null: false
    end
  end
end
