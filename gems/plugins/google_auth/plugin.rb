# frozen_string_literal: true

settings do
  field :client_id, default: ENV['GOOGLE_OAUTH2_ID']
  field :client_secret, type: :encrypted, default: ENV['GOOGLE_OAUTH2_SECRET']
end

on :omniauth_providers_setup do |config|
  config.omniauth :google_oauth2, settings.client_id, settings.client_secret, { logo: metadata[:logo] }
end
