# frozen_string_literal: true

class Accounts::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  def new
    render 'pages/accounts'
  end

  # POST /resource/password
  def create
    # Only Support GraphQL API
    raise ActionController::RoutingError, 'Not Found'
  end

  def edit
    render 'pages/accounts'
  end

  def update
    # Only Support GraphQL API
    raise ActionController::RoutingError, 'Not Found'
  end
end
