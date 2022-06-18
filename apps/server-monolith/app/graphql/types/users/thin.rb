# frozen_string_literal: true

module Types
  module Users
    class Thin < Types::BaseObject
      graphql_name 'ThinUser'
      description 'Like podMember but thin'
      field :avatar_data, Types::Pods::Avatar, 'Pod Avatar', null: true
      field :domain, String, 'Like a username, Unique within this instance of Brickdoc', null: false
      field :email, String, 'owner email', null: true
      field :name, String, 'Pod Name', null: false
    end
  end
end
