# frozen_string_literal: true
module DeviseGraphQLHelper
  extend ActiveSupport::Concern

  def redirect_path
    key = :user_return_to
    return context[:routes].root_path if context[:session][key].blank?
    context[:session].delete(key)
  end

  def sign_in(user)
    context[:session].keys.grep(/^devise\./).each { |k| session.delete(k) }
    context[:warden].set_user(user, scope: :user)
  end
end
