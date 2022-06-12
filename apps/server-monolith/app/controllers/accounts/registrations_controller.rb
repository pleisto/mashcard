# frozen_string_literal: true

module Accounts
  class RegistrationsController < ::Devise::RegistrationsController
    # before_action :configure_sign_in_params, only: [:create]

    # GET /resource/sign_up
    def new
      render 'pages/pwa'
    end

    # POST /resource/sign_up
    def create
      # Only Support GraphQL API
      raise ActionController::RoutingError, 'Not Found'
    end
  end
end
