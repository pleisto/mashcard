# typed: true
# frozen_string_literal: true

module Accounts
  module Mutations
    class UserSignOut < BrickGraphQL::BaseMutation
      include DeviseGraphQLHelper
      requires_entrypoint_to_be :internal

      def resolve
        sign_out(context[:current_user])
        {}
      end
    end
  end
end
