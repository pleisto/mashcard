# frozen_string_literal: true

module Mutations
  module Users
    class Destroy < ::Mutations::BaseMutation
      graphql_name 'UserDestroy'
      include DeviseGraphQLHelper
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
