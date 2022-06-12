# frozen_string_literal: true

module Accounts
  module Mutations
    class UserEmailPasswordSignIn < BrickGraphQL::BaseMutation
      include DeviseGraphQLHelper
      requires_entrypoint_to_be :internal

      argument :email, BrickGraphQL::Scalars::Email, description_same(Objects::User, :email), required: true
      argument :password, String, 'user password', required: true
      argument :remember, Boolean, 'remember authentication session', required: true

      field :redirect_path, String, 'redirect url path when sign in successful', null: true

      def resolve(email:, password:, remember:)
        user = Accounts::User.find_for_database_authentication(email: email)
        if user&.valid_for_authentication? { user.valid_password?(password) }
          user.after_database_authentication
          user.remember_me if remember
          user.resend_confirmation_instructions unless user.confirmed? # resend confirmation mail
          sign_in(user)
          errors = []
        else
          errors = [I18n.t("devise.failure.#{user.blank? ? 'invalid' : user.unauthenticated_message}",
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
