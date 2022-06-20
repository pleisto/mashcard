# frozen_string_literal: true

module Mutations
  module Users
    class PasswordReset < ::Mutations::BaseMutation
      graphql_name 'UserPasswordReset'
      argument :password, String, 'Reset password', required: true
      argument :token, String, 'Reset password token by Devise', required: true

      ## https://www.rubydoc.info/github/plataformatec/devise/Devise/Models/Recoverable/ClassMethods#send_reset_password_instructions-instance_method
      def resolve(token:, password:)
        reset_password_token = Devise.token_generator.digest(::Users::Authentication, :reset_password_token, token)
        user_authencation = ::Users::Authentication.find_by(reset_password_token: reset_password_token)
        return { errors: [I18n.t('devise.passwords.no_token')] } if user_authencation.nil?

        return { errors: [I18n.t('devise.failure.reset_password_token_expired')] } unless user_authencation.reset_password_period_valid?

        success = user_authencation.reset_password(password, password)
        return { errors: user_authencation.errors.full_messages } unless success

        {}
      end
    end
  end
end
