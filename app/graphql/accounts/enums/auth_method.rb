# frozen_string_literal: true

module Accounts
  class Enums::AuthMethod < BrickGraphQL::BaseEnum
    description 'Available authentication authentication.'

    if ::BrickdocConfig.accounts_email_password_auth?
      value :email_password, 'Email and Password Authentication'
    end

    Devise.omniauth_configs.keys.each do |provider|
      value provider, "#{provider.to_s.capitalize} Federated Authentication"
    end
  end
end
