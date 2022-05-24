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

  ## https://github.com/heartcombo/devise/blob/master/lib/devise/controllers/sign_in_out.rb#L80
  def sign_out(user)
    return if user.nil?

    # context[:session].keys.grep(/^devise\./).each { |k| session.delete(k) }
    # context[:warden].set_user(nil, scope: :user)
    context[:warden].logout(:user)
    context[:warden].clear_strategies_cache!(scope: :user)
  end
end
