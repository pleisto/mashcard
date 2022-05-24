# frozen_string_literal: true

module System
  module Queries
    class PasswordAvailable < BrickGraphQL::BaseResolver
      requires_entrypoint_to_be :internal
      description 'Check password available.'
      type Objects::ValidateResult, null: false

      argument :password, GraphQL::Types::String, required: true

      def resolve(password:)
        Accounts::User.password_available? password
      end
    end
  end
end
