# frozen_string_literal: true

module Types
  class User < Types::BasePod
    has_primary_key

    graphql_name 'User'
    description 'A user is an individual\'s accounts on MashCard can make new content.'

    field :locale, String, 'User\'s preferred language', null: false
    field :timezone, String, 'User\'s preferred timezone', null: false
  end
end
