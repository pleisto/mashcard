# frozen_string_literal: true

settings do
  field :client_id, default: ENV['GOOGLE_OAUTH2_ID'], belongs_to: :global
  field :client_secret, type: :encrypted, default: ENV['GOOGLE_OAUTH2_SECRET'], belongs_to: :global
end

on :oauth_provider do
  [:google_oauth2, settings.client_id, settings.client_secret, { logo: asset_url('assets/google_icon.svg') }]
end
