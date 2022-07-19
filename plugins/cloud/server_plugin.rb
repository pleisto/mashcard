# frozen_string_literal: true

LICENSE = 'I hereby swear that I have obtained written permission from the Brickdoc Inc of this plugin to use it.'
throw 'The cloud plugin is proprietary software and cannot be used without a license.' if ENV['MASHCARD_CLOUD_LICENSE'] != LICENSE

settings do
  field :sentry_dsn, default: ENV['SENTRY_DSN'], read_only: true
end

as_extended_edition!
