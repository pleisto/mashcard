# frozen_string_literal: true

module Accounts
  class RegistrationsController < ::Devise::RegistrationsController
    # before_action :configure_sign_in_params, only: [:create]

    # GET /resource/sign_up
    def new
      redirect_to '/accounts/sign-up'
    end

    # POST /resource/sign_up
    def create
      # Only Support GraphQL API
      raise ActionController::RoutingError, 'Not Found'
    end

    # GET /resource/edit
    def edit
      raise ActionController::NotImplemented
    end

    # PUT /resource
    def update
      raise ActionController::NotImplemented
    end

    # DELETE /resource
    def destroy
      super
    end

    # GET /resource/cancel
    # Forces the session data which is usually expired after sign
    # in to be expired now. This is useful if the user wants to
    # cancel oauth signing in/up in the middle of the process,
    # removing all OAuth session data.
    def cancel
      super
    end
  end
end
