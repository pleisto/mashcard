# frozen_string_literal: true

module Types
  class Pod < Types::BaseObject
    graphql_name 'Pod'
    description 'MashCard Pod.'
    has_primary_key

    field :avatar_data, Pods::Avatar, 'Pod Avatar', null: true
    field :bio, String, 'public profile bio', null: true
    field :domain, String, 'Like a username, Unique within this instance of MashCard', null: false
    field :invite_enable, Boolean, 'enable invite feature', null: false
    field :invite_secret, String, 'invite secret', null: true
    field :name, String, 'Pod Name', null: true
    field :owned, Boolean, 'owner is current user', null: false
    field :personal, Boolean, 'personal', null: false
  end
end
