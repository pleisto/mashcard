# frozen_string_literal: true

module BrickdocPlugin::GithubWebhook
  class Engine < BrickdocPlugin::Engine
    isolate_namespace BrickdocPlugin::GithubWebhook
  end

  Engine.routes.draw do
    get "/events/:uuid" => "events#index"
    post "/events/:uuid" => "events#create"
  end
end
