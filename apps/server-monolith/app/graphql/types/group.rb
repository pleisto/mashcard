# frozen_string_literal: true

module Types
  class Group < Types::PodBase
    has_primary_key

    graphql_name 'Group'
    description 'MashCard Group.'

    field :invite_enable, Boolean, 'enable invite feature', null: false
    field :invite_secret, String, 'invite secret', null: true
  end
end
