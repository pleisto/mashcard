# frozen_string_literal: true
module Accounts
  module Objects
    class User < BrickGraphQL::BaseObject
      global_id_field :id

      graphql_name 'accounts_user'
      description 'A user is an individual\'s accounts on Brickdoc can make new content.'

      field :webid, String, 'Like a username, Unique within this instance of Brickdoc.', null: false
      field :name, String, 'Human-readable name of the user', null: false
      field :bio, String, 'the user\'s public profile bio', null: true
      field :email, String, 'User\'s email address', null: true
      field :locale, String, 'User\'s preferred language', null: false
      field :timezone, String, 'User\'s preferred timezone', null: false
    end
  end
end
