# frozen_string_literal: true

module Accounts
  class PasswordsController < ::Devise::PasswordsController
    # GET /resource/password/new
    def new
      raise ActionController::NotImplemented
    end

    # POST /resource/password
    def create
      # Only Support GraphQL API
      raise ActionController::RoutingError, 'Not Found'
    end

    # GET /resource/password/edit?reset_password_token=abcdef
    def edit
      redirect_to '/accounts/password/edit'
    end

    def update
      # Only Support GraphQL API
      raise ActionController::RoutingError, 'Not Found'
    end
  end
end
