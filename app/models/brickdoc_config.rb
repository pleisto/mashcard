# frozen_string_literal: true

# == Schema Information
#
# Table name: settings
#
#  id         :bigint           not null, primary key
#  value      :text
#  var        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_settings_on_var  (var) UNIQUE
#
# RailsSettings Model
class BrickdocConfig < RailsSettings::Base
  cache_prefix { "v1" }
  field :default_locale, default: 'en-US'
  field :default_timezone, default: 'UTC'
  field :host, default: (Rails.env.development? ? 'localhost' : Brickdoc::Runtime.hostname)

  # ActionMailer
  field :mailer, type: :hash, default: {
    from: ENV['SMTP_FROM'] || 'webmaster@localhost',
    url: ENV['SMTP_URL'] || 'smtp://localhost:1025'
  }

  # The reversible_int_hash algorithm can help us hide the real database primary key of the resource in GraphQL.
  # Please Run `./bin/generate-reversible-int-hash-seed` and set the environment variables according to the result.
  field :reversible_int_hash, type: :hash, read_only: true, default: {
    prime: ENV['SECURITY_REVERSIBLE_INT_PRIME'],
    inverse_integer: ENV['SECURITY_REVERSIBLE_INT_INVERSE'],
    random_integer: ENV['SECURITY_REVERSIBLE_INT_RANDOM']
  }

  # Keep personally identifiable information (PII) out of logs.
  field :pii_masking, type: :boolean, default: Brickdoc.saas?

  field :user_agreement_link, type: :string, default: 'https://www.contributor-covenant.org/version/2/0/code_of_conduct/'

  # Accounts
  field :accounts_email_password_auth, type: :boolean, default: true
  # rubocop:disable Layout/LineLength
  field :accounts_federated_providers, type: :array, default: [
    {

      name: 'github',
      logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImN1cnJlbnRDb2xvciIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjYgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAyIDMuNDM4IDkuOCA4LjIwNyAxMS4zODcuNTk5LjExMS43OTMtLjI2MS43OTMtLjU3N3YtMi4yMzRjLTMuMzM4LjcyNi00LjAzMy0xLjQxNi00LjAzMy0xLjQxNi0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zMDEgMS4yMy45NTctLjI2NiAxLjk4My0uMzk5IDMuMDAzLS40MDQgMS4wMi4wMDUgMi4wNDcuMTM4IDMuMDA2LjQwNCAyLjI5MS0xLjU1MiAzLjI5Ny0xLjIzIDMuMjk3LTEuMjMuNjUzIDEuNjUzLjI0MiAyLjg3NC4xMTggMy4xNzYuNzcuODQgMS4yMzUgMS45MTEgMS4yMzUgMy4yMjEgMCA0LjYwOS0yLjgwNyA1LjYyNC01LjQ3OSA1LjkyMS40My4zNzIuODIzIDEuMTAyLjgyMyAyLjIyMnYzLjI5M2MwIC4zMTkuMTkyLjY5NC44MDEuNTc2IDQuNzY1LTEuNTg5IDguMTk5LTYuMDg2IDguMTk5LTExLjM4NiAwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg==',
      key: ENV['GITHUB_KEY'],
      secret: ENV['GITHUB_SECRET'],
      options: {}
    },
  ]
  # rubocop:enable Layout/LineLength
  field :accounts_preferred_auth_method, default: Brickdoc.saas? ? 'github' : 'email_password'

  # Fix rubymine code inspector
  def self.respond_to_missing?(sym, *_args)
    keys.include? sym.to_s
  end
end
