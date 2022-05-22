# typed: true
# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user, :current_space

    def connect
      self.current_user = find_verified_user
      self.current_space = find_current_space(current_user) || Space::ANONYMOUS_CONTEXT
    end

    private

    def find_verified_user
      env['warden'].user
      # reject_unauthorized_connection
    end

    def find_current_space(user)
      return nil if user.nil?

      env['warden'].session['current_space'] || user.fetch_current_space_cache.as_session_context
    end
  end
end
