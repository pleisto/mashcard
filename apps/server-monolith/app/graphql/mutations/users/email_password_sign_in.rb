# frozen_string_literal: true

module Mutations
  module Users
    class EmailPasswordSignIn < ::Mutations::BaseMutation
      graphql_name 'UserEmailPasswordSignIn'
      include DeviseGraphQLHelper
      argument :email, Scalars::Email, "User's email address", required: true
      argument :password, String, 'user password', required: true
      argument :remember, Boolean, 'remember authentication session', required: true

      field :redirect_path, String, 'redirect url path when sign in successful', null: true

      def resolve(email:, password:, remember:)
        user_authentication = ::Users::Authentication.find_for_database_authentication(email: email)
        if user_authentication&.valid_for_authentication? { user_authentication.valid_password?(password) }
          user_authentication.after_database_authentication
          user_authentication.remember_me if remember
          user_authentication.resend_confirmation_instructions unless user_authentication.confirmed? # resend confirmation mail
          sign_in(user_authentication)
          errors = []
        else
          errors = [I18n.t("devise.failure.#{user_authentication.blank? ? 'invalid' : user_authentication.unauthenticated_message}",
            authentication_keys: 'email')]
        end
        {
          redirect_path: errors.blank? ? redirect_path : nil,
          errors: errors,
        }
      end
    end
  end
end
