
# frozen_string_literal: true

settings do
  field :client_id, default: ENV['GITHUB_KEY']
  field :client_secret, type: :encrypted, default: ENV['GITHUB_SECRET']
end

on :omniauth_providers_setup do |config|
  config.omniauth :github, settings.client_id, settings.client_secret, { logo: metadata[:logo] }
end
