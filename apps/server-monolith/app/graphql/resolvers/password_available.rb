# frozen_string_literal: true

module Resolvers
  class PasswordAvailable < BaseResolver
    description 'Check password available.'
    type Types::ValidateResult, null: false

    argument :password, GraphQL::Types::String, required: true

    def resolve(password:)
      ::Users::Authentication.password_available? password
    end
  end
end
