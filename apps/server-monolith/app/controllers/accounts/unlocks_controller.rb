# frozen_string_literal: true

module Accounts
  class UnlocksController < Devise::UnlocksController
    # GET /resource/unlock/new
    def new
      raise ActionController::NotImplemented
    end

    # POST /resource/unlock
    def create
      # Only Support GraphQL API
      raise ActionController::RoutingError, 'Not Found'
    end

    # GET /resource/unlock?unlock_token=abcdef
    def show
      super
    end
  end
end
