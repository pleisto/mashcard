# frozen_string_literal: true

settings do
  field :client_id, default: ENV['GITHUB_KEY'], belongs_to: :global
  field :client_secret, type: :encrypted, default: ENV['GITHUB_SECRET'], belongs_to: :global
end

on :oauth_provider do
  [:github, settings.client_id, settings.client_secret, { logo: asset_url('logo.svg') }]
end
