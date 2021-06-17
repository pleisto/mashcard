# frozen_string_literal: true
module Accounts
  class Mutations::UserPasswordReset < BrickGraphQL::BaseMutation
    requires_entrypoint_to_be :internal

    argument :token, String, "Reset password token by Devise", required: true
    argument :password, String, "Reset password", required: true

    ## https://www.rubydoc.info/github/plataformatec/devise/Devise/Models/Recoverable/ClassMethods#send_reset_password_instructions-instance_method
    def resolve(token:, password:)
      reset_password_token = Devise.token_generator.digest(Accounts::User, :reset_password_token, token)
      user = Accounts::User.find_by(reset_password_token: reset_password_token)
      return { errors: ["Token #{I18n.t('devise.passwords.no_token')}"] } if user.nil?

      return { errors: [I18n.t("devise.failure.reset_password_token_expired")] } unless user.reset_password_period_valid?

      success = user.reset_password(password, password)
      return { errors: user.errors.full_messages } unless success

      {}
    end
  end
end
