# frozen_string_literal: true
module Accounts
  class Mutations::EmailPasswordSignIn < BrickGraphQL::BaseMutation
    argument :email, BrickGraphQL::Scalars::Email, 'user email', required: true
    argument :password, String, 'user password', required: true
    argument :remember, Boolean, 'remember password', required: true

    field :user, Accounts::Objects::User, null: true
    field :redirect_path, String, 'redirect url path when sig in successful', null: true

    def resolve(email:, password:, remember:)
      user = Accounts::User.find_for_database_authentication(email: email)
      if user&.valid_for_authentication? { user.valid_password?(password) }
        user.after_database_authentication
        user.remember_me if remember
        sign_in(user)
        errors = []
      else
        errors = [I18n.t("devise.failure.#{user.blank? ? 'invalid' : user.unauthenticated_message}",
                         authentication_keys: 'email')]
      end
      {

        user: user,
        redirect_path: errors.blank? ? redirect_path : nil,
        errors: errors
      }
    end

    private

    def sign_in(user)
      context[:session].keys.grep(/^devise\./).each { |k| session.delete(k) }
      context[:warden].set_user(user, scope: :user)
    end

    def redirect_path
      return '/' if context[:session][:user_return_to].blank?
      context[:session].delete(:user_return_to)
    end
  end
end
