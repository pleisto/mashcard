# typed: strict
# frozen_string_literal: true

module System
  module Objects
    class Space < BrickGraphQL::BaseObject
      graphql_name 'space'
      description 'Brickdoc Space.'
      has_primary_key

      field :avatar_data, Avatar, 'Space Avatar', null: true
      field :bio, String, 'public profile bio', null: true
      field :domain, String, 'Like a username, Unique within this instance of Brickdoc', null: false
      field :email, String, 'owner email', null: true
      field :invite_enable, Boolean, 'enable invite feature', null: false
      field :invite_secret, String, 'invite secret', null: true
      field :name, String, 'Space Name', null: true
      field :owned, Boolean, 'owner is current user', null: false
      field :personal, Boolean, 'personal', null: false
    end
  end
end
