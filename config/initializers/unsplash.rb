# frozen_string_literal: true
Rails.application.config.to_prepare do
  Unsplash.configure do |config|
    config.application_access_key = BrickdocConfig.unsplash_api_access_key
    config.application_secret = BrickdocConfig.unsplash_api_secret
  end
end
