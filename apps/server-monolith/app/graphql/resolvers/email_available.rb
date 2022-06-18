# frozen_string_literal: true

module Resolvers
  class EmailAvailable < BaseResolver
    description 'Check email available.'
    type Types::ValidateResult, null: false

    argument :email, GraphQL::Types::String, required: true

    def resolve(email:)
      Accounts::User.email_available? email
    end
  end
end
