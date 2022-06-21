# frozen_string_literal: true

module Types
  module Pods
    class Member < Types::BaseObject
      graphql_name 'PodMember'
      has_primary_key

      field :avatar_data, Avatar, 'Pod Avatar', null: true
      field :domain, String, 'Like a username, Unique within this instance of MashCard', null: false
      field :email, String, 'owner email', null: true
      field :name, String, 'Pod Name', null: false

      field :role, MemberRole, 'role', null: false
      field :state, MemberState, 'state', null: false
    end
  end
end
