# frozen_string_literal: true
module Accounts
  class Mutations::UserCreate < BrickGraphQL::BaseMutation
    include DeviseGraphQLHelper
    requires_entrypoint_to_be :internal

    argument :domain, String, description_same(Objects::User, :domain), required: true
    argument :name, String, description_same(Objects::User, :name), required: true
    argument :email, BrickGraphQL::Scalars::Email, description_same(Objects::User, :email), required: false
    argument :password, String, 'user password', required: false
    argument :locale, String, description_same(Objects::User, :locale), required: true
    argument :timezone, String, description_same(Objects::User, :timezone), required: true

    field :is_user_active, Boolean, null: true
    field :redirect_path, String, 'redirect url path when sig up successful', null: true

    def resolve(**args)
      # session is lazy load, so wo require keys method to warn.
      context[:session].keys

      user = Accounts::User.new
      user.domain = args[:domain]
      user.name = args[:name]
      user.locale = args[:locale]
      user.timezone = args[:timezone]
      omniauth = false
      if context[:session][:omniauth].present? && args[:password].blank?
        omniauth = true
        federated_identity_sign_up(user)
      else
        email_password_sign_up(user, args[:email], args[:password])
      end
      user.save
      user.personal_space.fix_avatar! if omniauth

      return { errors: errors_on_object(user) } unless user.valid?

      if user.active_for_authentication?
        sign_in(user)
        context[:session].delete(:omniauth)
        { redirect_path: redirect_path, is_user_active: true }
      else
        { is_user_active: false }
      end
    end

    private

    def email_password_sign_up(user, email, password)
      if email.blank? || password.blank?
        raise BrickGraphQL::Errors::ArgumentError, "Expected email and password to not be null"
      end
      user.email = email
      user.password = password
      # password_confirmation has been validated on the client-side
      user.password_confirmation = password
    end

    def federated_identity_sign_up(user)
      omniauth = context[:session][:omniauth].with_indifferent_access
      user.email = omniauth[:info][:email]
      user.avatar = Space.import_avatar omniauth[:info][:avatar]
      user.omniauth_provider = omniauth[:provider]
      user.omniauth_uid = omniauth[:uid]
    end
  end
end
