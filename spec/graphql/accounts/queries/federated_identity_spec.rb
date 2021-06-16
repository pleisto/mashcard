# frozen_string_literal: true

require 'rails_helper'

describe Accounts::Queries::FederatedIdentitySession, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query GetFederatedIdentitySession {
          federatedIdentitySession {
            hasSession
            webid
            name
            provider
          }
       }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(query)).to be true
    end

    it 'works' do
      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data[:federatedIdentitySession][:hasSession]).to be false
      request.session[:omniauth] = {
        # test with_indifferent_access
        'provider' => :github,
        info: {
          webid: 'cccp',
          name: 'USSR'
        }
      }
      internal_graphql_execute(query)
      expect(response.data[:federatedIdentitySession][:name]).to be 'USSR'
    end
  end
end
