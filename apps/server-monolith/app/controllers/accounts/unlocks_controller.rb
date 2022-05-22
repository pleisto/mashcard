# typed: false
# frozen_string_literal: true

module Accounts
  class UnlocksController < Devise::UnlocksController
    # GET /resource/unlock/new
    def new
      render 'pages/pwa'
    end

    # POST /resource/unlock
    def create
      # Only Support GraphQL API
      raise ActionController::RoutingError, 'Not Found'
    end
  end
end
