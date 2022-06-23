# frozen_string_literal: true

module Types
  module Pods
    class Member < Types::BaseObject
      graphql_name 'PodMember'
      has_primary_key

      field :user, User, 'member', null: false

      field :role, MemberRole, 'role', null: false
      field :state, MemberState, 'state', null: false
    end
  end
end
