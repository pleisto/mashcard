# frozen_string_literal: true

class Accounts::ConfirmationsController < Devise::ConfirmationsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/confirmation/new
  def new
    render 'pages/accounts'
  end

  # POST /resource/confirmation
  def create
    # Only Support GraphQL API
    raise ActionController::RoutingError, 'Not Found'
  end
end
