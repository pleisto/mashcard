# frozen_string_literal: true

class Accounts::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def action_missing(name)
    raise ActionController::RoutingError, 'Not Found' unless Devise.omniauth_configs.keys.include?(name.to_sym)
    redirect_to(new_user_session_path) && return if omniauth_auth.blank?
    @identity = Accounts::FederatedIdentity.find_by(provider: omniauth_auth[:provider], uid: omniauth_auth[:uid])
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
    auth = request.env["omniauth.auth"]
    webid = auth&.webid || auth.info&.nickname || auth.info&.login
    webid = auth.info&.email&.split('@')&.first if webid.blank?
    @omniauth_auth = {
      provider: auth.provider,
      uid: auth.uid,
      info: {
        webid: webid,
        email: auth.info&.email,
        name: auth.info&.name || webid,
        avatar: auth.info&.image
      }
    }
  end
end
