# frozen_string_literal: true
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user, :current_pod

    def connect
      self.current_user = find_verified_user
      self.current_pod = find_current_pod(current_user) || Pod::ANONYMOUS_CONTEXT
    end

    private

    def find_verified_user
      env['warden'].user
      # reject_unauthorized_connection
    end

    def find_current_pod(user)
      return nil if user.nil?

      env['warden'].session['current_pod'] || user.fetch_current_pod_cache.as_session_context
    end
  end
end
