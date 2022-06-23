# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::DomainAvailable, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryDomainAvailable($domain: String!) {
         domainAvailable(domain: $domain) {
          success
          message
        }
       }
    GRAPHQL

    it 'works' do
      graphql_execute(query, { domain: 'foo-bar' })
      expect(response.data['domainAvailable']).to eq({ 'success' => true, 'message' => 'ok' })

      graphql_execute(query, { domain: 'legitimate-name-example' })
      expect(response.data['domainAvailable']).to eq({ 'success' => true, 'message' => 'ok' })
    end

    it 'invalid' do
      graphql_execute(query, { domain: 'legitimate@name-example' })
      expect(response.data['domainAvailable']).to eq({ 'success' => false,
'message' => I18n.t('errors.messages.domain_invalid'), })
    end

    it 'expect domain uniqueness' do
      stub = create(:pod)
      graphql_execute(query, { domain: stub.domain })
      expect(response.data['domainAvailable']).to eq({ 'success' => false,
'message' => I18n.t('errors.messages.taken'), })

      # Soft deleted
      stub.destroy
      graphql_execute(query, { domain: stub.domain })
      expect(response.data['domainAvailable']).to eq({ 'success' => false,
'message' => I18n.t('errors.messages.taken'), })

      # Hard deleted
      stub.really_destroy!
      graphql_execute(query, { domain: stub.domain })
      expect(response.data['domainAvailable']).to eq({ 'success' => true, 'message' => 'ok' })
    end

    it 'blacklist' do
      graphql_execute(query, { domain: 'admin' })
      expect(response.success?).to be true
      expect(response.data['domainAvailable']).to eq({ 'success' => false,
'message' => I18n.t('errors.messages.domain_invalid'), })

      graphql_execute(query, { domain: 'anonymous' })
      expect(response.success?).to be true
      expect(response.data['domainAvailable']).to eq({ 'success' => false,
'message' => I18n.t('errors.messages.domain_invalid'), })
    end
  end
end
