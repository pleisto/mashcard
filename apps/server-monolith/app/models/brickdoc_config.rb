# frozen_string_literal: true

# == Schema Information
#
# Table name: brickdoc_configs
#
#  id                                                                :bigint           not null, primary key
#  key(setting key with namespace)                                   :ltree            not null
#  scope(scope for recursive search. e.g. R.user_1.pod_2 or R.pod_1) :ltree            default("R"), not null
#  value                                                             :jsonb
#
# Indexes
#
#  index_brickdoc_configs_on_key_and_scope  (key,scope) UNIQUE
#

class BrickdocConfig < ApplicationRecord
  # See lib/brickdoc/settings/base.rb for more details
  include Brickdoc::Settings::Base
  serialize :value

  field :locale, default: 'en-US', belongs_to: :user
  field :timezone, default: 'UTC', belongs_to: :user
  field :host, default: (Rails.env.development? ? 'localhost' : Brickdoc::Runtime.hostname)

  # ActionMailer
  field :mailer, type: :hash, symbolize_keys: true, default: {
    from: ENV['SMTP_FROM'] || 'webmaster@localhost',
    url: ENV['SMTP_URL'] || 'smtp://localhost:1025',
  }

  # The reversible_int_hash algorithm can help us hide the real database primary key of the resource in GraphQL.
  # Please Run `./bin/generate-reversible-int-hash-seed` and set the environment variables according to the result.
  field :reversible_int_hash, type: :hash, symbolize_keys: true, read_only: true, default: {
    prime: ENV['SECURITY_REVERSIBLE_INT_PRIME'],
    inverse_integer: ENV['SECURITY_REVERSIBLE_INT_INVERSE'],
    random_integer: ENV['SECURITY_REVERSIBLE_INT_RANDOM'],
  }

  # Rails.application.config.active_storage.service
  field :active_storage_service, default: (
    if Rails.env.test?
      'test'
    else
      (Rails.env.development? ? 'local' : 'gcs_privtae')
    end
  )

  field :gcs_config, type: :hash, symbolize_keys: true, default: {
    private_bucket: ENV['GCS_PRIVATE_BUCKET'],
    public_bucket: ENV['GCS_PUBLIC_BUCKET'],
  }

  field :user_agreement_link, type: :string, default: 'https://help.brickdoc.com/en/articles/5971105-terms-of-service'

  # Accounts
  field :accounts_email_password_auth, type: :boolean, default: true
  field :accounts_preferred_auth_method, default: 'email_password'

  field :unsplash_api_access_key, default: ENV['UNSPLASH_API_ACCESS_KEY']
  field :unsplash_api_secret, default: ENV['UNSPLASH_API_SECRET']

  field :iframely_api_access_key, default: ENV['IFRAMELY_API_ACCESS_KEY']

  # Pdftron
  field :pdfjs_express_license, type: :string, default: ENV['PDFJS_EXPRESS_LICENSE'], frontend: true

  # helpdesk Knowledge Base
  field :kb_articles, type: :hash, default: {
    changing_domain: 'https://help.brickdoc.com/en/articles/5972616-brickdoc-username-policy',
  }, frontend: true

  field :state_max_updates, type: :integer, default: 50

  field :history_gap_threshold, type: :integer, default: 1
  field :history_min_interval, type: :integer, default: 5
  field :history_max_states, type: :integer, default: 50

  namespace :features do
    # field :page_history, type: :boolean, default: (Rails.env.development? ? true : false), frontend: true
    field :experiment_discussion, type: :boolean, default: (Rails.env.development? ? true : false), frontend: true
    field :experiment_collaboration, type: :boolean, default: (Rails.env.development? ? true : false), frontend: true
    field :experiment_history, type: :boolean, default: (Rails.env.development? ? true : false), frontend: true
  end
end
