# frozen_string_literal: true

settings do
  field :secret
end

on :test_autoload do |arg|
  arg[:lib] = BrickdocPlugin::GithubWebhook::TEST_LOAD
  arg[:model] = BrickdocPlugin::GithubWebhook::Test::TEST_LOAD
end

load_engine!
