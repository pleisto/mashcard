# frozen_string_literal: true

module Types
  module Users
    class OmniauthSession < Types::BaseObject
      graphql_name 'OmniauthSession'
      description 'session[:omniauth]'

      field :domain, String, description_same(Types::User, :domain), null: true
      field :has_session, Boolean, null: false
      field :name, String, description_same(Types::User, :name), null: true
      field :provider, String,
        description_same(FederatedProvider, :name), null: true
    end
  end
end
