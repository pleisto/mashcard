# frozen_string_literal: true

module CurrentUser
  extend ActiveSupport::Concern

  def devise_current_user
    @devise_current_user ||= warden.authenticate(scope: :user)
  end

  def current_user
    devise_current_user&.user
  end
end
