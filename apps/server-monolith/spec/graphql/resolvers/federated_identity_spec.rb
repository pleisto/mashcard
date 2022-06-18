# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::FederatedIdentitySession, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query GetFederatedIdentitySession {
          federatedIdentitySession {
            hasSession
            domain
            name
            provider
          }
       }
    GRAPHQL

    it 'works' do
      graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data[:federatedIdentitySession][:hasSession]).to be false
      request.session[:omniauth] = {
        # test with_indifferent_access
        'provider' => :github,
        info: {
          domain: 'cccp',
          name: 'USSR',
        },
      }
      graphql_execute(query)
      expect(response.data[:federatedIdentitySession][:name]).to be 'USSR'
    end
  end
end
