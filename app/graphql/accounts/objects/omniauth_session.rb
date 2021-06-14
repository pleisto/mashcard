# frozen_string_literal: true
module Accounts
  module Objects
    class OmniauthSession < BrickGraphQL::BaseObject
      graphql_name 'omniauthSession'
      description 'session[:omniauth]'

      field :has_session, Boolean, null: false
      field :provider, String,
            description_same(Accounts::Objects::FederatedProvider, :name), null: true
      field :webid, String, description_same(Accounts::Objects::User, :webid), null: true
      field :name, String, description_same(Accounts::Objects::User, :name), null: true
    end
  end
end
