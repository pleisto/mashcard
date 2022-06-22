# frozen_string_literal: true

module Mutations
  module Users
    class Create < ::Mutations::BaseMutation
      graphql_name 'UserCreate'
      include DeviseGraphQLHelper

      argument :domain, String, description_same(Types::User, :domain), required: true
      argument :email, Scalars::Email, description_same(Types::User, :email), required: false
      argument :locale, String, description_same(Types::User, :locale), required: true
      argument :name, String, description_same(Types::User, :name), required: true
      argument :password, String, 'user password', required: false
      argument :timezone, String, description_same(Types::User, :timezone), required: true

      field :is_user_active, Boolean, null: true
      field :redirect_path, String, 'redirect url path when sig up successful', null: true

      def resolve(**args)
        # session is lazy load, so wo require keys method to warn.
        context[:session].keys

        authentication = ::Users::Authentication.new
        authentication.username = args[:domain]
        authentication.display_name = args[:name]
        # omniauth = false
        if context[:session][:omniauth].present? && args[:password].blank?
          # omniauth = true
          federated_identity_sign_up(authentication)
        else
          email_password_sign_up(authentication, args[:email], args[:password])
        end
        authentication.save
        return { errors: errors_on_object(authentication) } unless authentication.valid?

        authentication.user.config.set(:locale, args[:locale])
        authentication.user.config.set(:timezone, args[:timezone])

        if authentication.active_for_authentication?
          sign_in(authentication)
          context[:session].delete(:omniauth)
          { redirect_path: redirect_path, is_user_active: true }
        else
          { is_user_active: false }
        end
      end

      private

      def email_password_sign_up(authentication, email, password)
        if email.blank? || password.blank?
          raise Mashcard::GraphQL::Errors::ArgumentError, 'Expected email and password to not be null'
        end

        authentication.email = email
        authentication.password = password
        # password_confirmation has been validated on the client-side
        authentication.password_confirmation = password
      end

      def federated_identity_sign_up(authentication)
        omniauth = context[:session][:omniauth].with_indifferent_access
        authentication.email = omniauth[:info][:email]
        authentication.external_avatar_url = omniauth[:info][:avatar]
        authentication.omniauth_provider = omniauth[:provider]
        authentication.omniauth_uid = omniauth[:uid]
      end
    end
  end
end
