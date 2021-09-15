# frozen_string_literal: true

module BrickdocPlugin::DummyPlugin
  class Engine < BrickdocPlugin::Engine
    isolate_namespace BrickdocPlugin::DummyPlugin
  end

  Engine.routes.draw do
    resources :echo
  end
end
