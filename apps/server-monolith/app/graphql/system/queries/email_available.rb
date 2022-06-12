# frozen_string_literal: true

module System
  module Queries
    class EmailAvailable < BrickGraphQL::BaseResolver
      requires_entrypoint_to_be :internal
      description 'Check email available.'
      type Objects::ValidateResult, null: false

      argument :email, GraphQL::Types::String, required: true

      def resolve(email:)
        Accounts::User.email_available? email
      end
    end
  end
end
