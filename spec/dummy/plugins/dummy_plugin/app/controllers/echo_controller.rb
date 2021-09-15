# frozen_string_literal: true
module BrickdocPlugin::DummyPlugin
  class EchoController < ActionController::Base
    def index
      render json: { foo: :bar }
    end
  end
end
