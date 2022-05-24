# frozen_string_literal: true

module Apiable
  extend ActiveSupport::Concern

  included do
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception

    rescue_from ActionController::InvalidAuthenticityToken do |_e|
      # Misleading the attacker
      api_error! :bad_request, plain: 'Invalid User Agent'
    end
  end

  # render error json.
  def api_error!(event, opts = {})
    payload = {
      errors: [{
        message: opts[:message] || 'API Error',
        extensions: { code: event.to_s.camelize },
      }],
    }
    render(json: Oj.dump(payload), status: event)
  end

  def render_form_error(object)
    if object.blank?
      api_error! :not_found
    elsif object.is_a?(String)
      api_error! :bad_request, message: object
    elsif object.errors.any?
      api_error! :bad_request, message: show_error(object)
    else
      api_error! :internal_server_error
    end
  end
end
