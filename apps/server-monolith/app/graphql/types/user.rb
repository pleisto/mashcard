# frozen_string_literal: true

module Types
  class User < Types::BaseObject
    has_primary_key

    graphql_name 'AccountsUser'
    description 'A user is an individual\'s accounts on Brickdoc can make new content.'

    field :bio, String, 'the user\'s public profile bio', null: true
    field :domain, String, 'Like a username, Unique within this instance of Brickdoc.', null: false
    field :email, String, 'User\'s email address', null: true, authorize_field: true
    field :locale, String, 'User\'s preferred language', null: false
    field :name, String, 'Human-readable name of the user', null: false
    field :timezone, String, 'User\'s preferred timezone', null: false
  end
end
