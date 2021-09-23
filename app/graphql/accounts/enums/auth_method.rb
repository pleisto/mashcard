# frozen_string_literal: true

module Accounts
  class Enums::AuthMethod < BrickGraphQL::BaseEnum
    description 'Available authentication authentication.'

    if ::BrickdocConfig.accounts_email_password_auth?
      value :email_password, 'Email and Password Authentication'
    end

    Devise.omniauth_configs&.map(&:last)&.each do |provider|
      name = provider.options[:provider_name]
      value provider.provider, "#{name.to_s.capitalize} Federated Authentication"
    end
  end
end
