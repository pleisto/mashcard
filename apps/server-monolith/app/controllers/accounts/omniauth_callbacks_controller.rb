# frozen_string_literal: true

module Accounts
  class OmniauthCallbacksController < ::Devise::OmniauthCallbacksController
    def action_missing(name)
      raise ActionController::RoutingError, 'Not Found' unless Devise.omniauth_configs.key?(name.to_sym)
      redirect_to(new_user_session_path) && return if omniauth_auth.blank?

      @identity = Users::AuthenticationFederatedIdentity.find_by(provider: omniauth_auth[:provider], uid: omniauth_auth[:uid])
      if @identity.present?
        sign_in_and_redirect @identity.user, event: :authentication
      else
        session[:omniauth] = omniauth_auth
        redirect_to new_user_registration_path
      end
    end

    private

    def omniauth_auth
      return @omniauth_auth if defined? @omniauth_auth

      auth = request.env['omniauth.auth']

      domain = auth.info&.nickname || auth.info&.login || auth.info&.email&.split('@')&.first
      @omniauth_auth = {
        provider: auth.provider,
        uid: auth.uid,
        info: {
          domain: domain,
          email: auth.info&.email,
          name: auth.info&.name || domain,
          avatar: auth.info&.image,
        },
      }
    end
  end
end
