# typed: strict
# frozen_string_literal: true

module Accounts
  module Objects
    class OmniauthSession < BrickGraphQL::BaseObject
      graphql_name 'omniauthSession'
      description 'session[:omniauth]'

      field :domain, String, description_same(Accounts::Objects::User, :domain), null: true
      field :has_session, Boolean, null: false
      field :name, String, description_same(Accounts::Objects::User, :name), null: true
      field :provider, String,
        description_same(Accounts::Objects::FederatedProvider, :name), null: true
    end
  end
end
