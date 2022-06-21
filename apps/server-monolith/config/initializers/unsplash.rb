# frozen_string_literal: true

Unsplash.configure do |config|
  config.application_access_key = MashcardConfig.unsplash_api_access_key
  config.application_secret = MashcardConfig.unsplash_api_secret
end
