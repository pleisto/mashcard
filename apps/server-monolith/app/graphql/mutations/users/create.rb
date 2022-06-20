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

        user = User.new
        user.username = args[:domain]
        user.display_name = args[:name]
        # omniauth = false
        if context[:session][:omniauth].present? && args[:password].blank?
          # omniauth = true
          federated_identity_sign_up(user)
        else
          email_password_sign_up(user, args[:email], args[:password])
        end
        user.save
        user.config.set(:locale, args[:locale])
        user.config.set(:timezone, args[:timezone])

        return { errors: errors_on_object(user) } unless user.valid?

        if user.authentication.active_for_authentication?
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
          raise Mashcard::GraphQL::Errors::ArgumentError, 'Expected email and password to not be null'
        end

        user.email = email
        user.password = password
        # password_confirmation has been validated on the client-side
        # user.password_confirmation = password
      end

      def federated_identity_sign_up(user)
        omniauth = context[:session][:omniauth].with_indifferent_access
        user.email = omniauth[:info][:email]
        user.external_avatar_url = omniauth[:info][:avatar]
        user.omniauth_provider = omniauth[:provider]
        user.omniauth_uid = omniauth[:uid]
      end
    end
  end
end
