# typed: true
# frozen_string_literal: true

module Accounts
  module Mutations
    class UserDestroy < BrickGraphQL::BaseMutation
      include DeviseGraphQLHelper
      requires_entrypoint_to_be :internal

      def resolve
        success = current_user.destroy_user!
        if success
          sign_out(current_user)
          {}
        else
          { errors: errors_on_object(current_user) }
        end
      end
    end
  end
end
