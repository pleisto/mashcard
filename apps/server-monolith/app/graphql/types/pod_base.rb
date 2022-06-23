# frozen_string_literal: true

module Types
  class PodBase < Types::BaseObject
    graphql_name 'PodBase'
    description 'MashCard Base Pod.'
    has_primary_key

    field :avatar_data, Pods::Avatar, 'Pod Avatar', null: true
    field :bio, String, 'public profile bio', null: true
    field :domain, String, 'Like a username, Unique within this instance of MashCard.', null: false
    field :name, String, 'Human-readable name', null: false
    field :owned, Boolean, 'owner is current user', null: false
    field :personal, Boolean, 'personal', null: false
    field :type, Pods::PodTypeEnum, 'Pod enum type', null: false
  end
end
