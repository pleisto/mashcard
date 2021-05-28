# frozen_string_literal: true
# RailsSettings Model
class BrickdocConfig < RailsSettings::Base
  cache_prefix { "v1" }
  field :default_locale, default: 'en-US'
  field :default_timezone, default: 'UTC'

  field :mailer, type: :hash, readonly: true, default: {
    from: ENV['SMTP_FROM'] || 'webmaster@localhost',
    url: ENV['SMTP_URL'] || 'smtp://localhost:1025'
  }

  field :security, type: :hash, read_only: true, default: {
    reversible_int_hash: {
      prime: ENV['SECURITY_REVERSIBLE_INT_PRIME'],
      inverse_integer: ENV['SECURITY_REVERSIBLE_INT_INVERSE'],
      random_integer: ENV['SECURITY_REVERSIBLE_INT_RANDOM']
    }
  }

  # Fix rubymine code inspector
  def self.respond_to_missing?(sym, *_args)
    keys.include? sym.to_s
  end
end
