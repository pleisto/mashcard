# frozen_string_literal: true

# == Schema Information
#
# Table name: brickdoc_configs
#
#  id         :bigint           not null, primary key
#  domain     :string           not null
#  domain_len :integer
#  key        :string           not null
#  scope      :string           not null
#  value      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_brickdoc_configs_on_key_and_scope_and_domain  (key,scope,domain) UNIQUE
#
class BrickdocConfig < ApplicationRecord
  include BrickdocSettings::Base

  @frontend_fields = {}

  class << self
    attr_accessor :frontend_fields

    def current
      Thread.current[:brickdoc_config_current] || self
    end

    def current=(config)
      Thread.current[:brickdoc_config_current] = config
    end

    # around current domian
    #
    # example:
    # BrickdocConfig.on(:global) { Brickdoc.current.something }
    # BrickdocConfig.on(Pod.find(1)) { Brickdoc.current.something = 1 }
    def on(domain, &block)
      # domian argument must is :global or Pod instance
      raise ArgumentError, "unsupported domain: #{domain}" unless domain == :global || domain.class == Pod
      config = domain == :global ? self : at("pod.#{domain.id}")
      old_current = current
      self.current = config
      begin
        yield block
      ensure
        self.current = old_current
      end
    end

    def field(key, scope: '', **opts)
      key = key.to_s
      if opts[:frontend]
        frontend_fields[scope] ||= []
        frontend_fields[scope].push key
      end
      super key, scope: scope, **opts
    end

    def to_frontend
      frontend_fields.map do |scope, keys|
        values = keys.uniq.map do |key|
          [key, get(key, scope: scope)]
        end.to_h
        [scope, values]
      end.to_h
    end
  end

  serialize :value

  field :default_locale, default: 'en-US'
  field :default_timezone, default: 'UTC'
  field :host, default: (Rails.env.development? ? 'localhost' : Brickdoc::Runtime.hostname)

  # ActionMailer
  field :mailer, type: :hash, symbolize_keys: true, default: {
    from: ENV['SMTP_FROM'] || 'webmaster@localhost',
    url: ENV['SMTP_URL'] || 'smtp://localhost:1025'
  }

  # The reversible_int_hash algorithm can help us hide the real database primary key of the resource in GraphQL.
  # Please Run `./bin/generate-reversible-int-hash-seed` and set the environment variables according to the result.
  field :reversible_int_hash, type: :hash, symbolize_keys: true, read_only: true, default: {
    prime: ENV['SECURITY_REVERSIBLE_INT_PRIME'],
    inverse_integer: ENV['SECURITY_REVERSIBLE_INT_INVERSE'],
    random_integer: ENV['SECURITY_REVERSIBLE_INT_RANDOM']
  }

  # Rails.application.config.active_storage.service
  field :active_storage_service, default: (
    if Rails.env.test?
      "test"
    else
      (Rails.env.development? ? "local" : "amazon_private")
    end
  )

  field :user_agreement_link, type: :string, default: 'https://www.contributor-covenant.org/version/2/0/code_of_conduct/'

  # Accounts
  field :accounts_email_password_auth, type: :boolean, default: true
  field :accounts_preferred_auth_method, default: 'email_password'

  field :unsplash_api_access_key, default: ENV['UNSPLASH_API_ACCESS_KEY']
  field :unsplash_api_secret, default: ENV['UNSPLASH_API_SECRET']

  field :sentry_dsn, default: ENV.fetch('SENTRY_DSN')

  field :lockbox_test, type: :encrypted
end
