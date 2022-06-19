# frozen_string_literal: true

module Mutations
  module Users
    class SignOut < ::Mutations::BaseMutation
      graphql_name 'UserSignOut'
      include DeviseGraphQLHelper

      def resolve
        sign_out(context[:current_user])
        {}
      end
    end
  end
end
