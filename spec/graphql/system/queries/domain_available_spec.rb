# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::DomainAvailable, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryDomainAvailable($domain: String!) {
         domainAvailable(domain: $domain) {
          success
          message
        }
       }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(query, { domain: 'test' })).to be true
    end

    it 'works' do
      internal_graphql_execute(query, { domain: 'foo-bar' })
      expect(response.data['domainAvailable']).to eq({ "success" => true, "message" => "ok" })

      internal_graphql_execute(query, { domain: 'legitimate-name-example' })
      expect(response.data['domainAvailable']).to eq({ "success" => true, "message" => "ok" })

      internal_graphql_execute(query, { domain: 'legitimate@name-example' })
      expect(response.data['domainAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.domain_invalid") })
    end

    it 'expect domain uniqueness' do
      stub = create(:space)
      internal_graphql_execute(query, { domain: stub.domain })
      expect(response.data['domainAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.taken") })

      # Soft deleted
      stub.destroy
      internal_graphql_execute(query, { domain: stub.domain })
      expect(response.data['domainAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.taken") })

      # Hard deleted
      stub.really_destroy!
      internal_graphql_execute(query, { domain: stub.domain })
      expect(response.data['domainAvailable']).to eq({ "success" => true, "message" => "ok" })
    end

    it 'blacklist' do
      internal_graphql_execute(query, { domain: 'admin' })
      expect(response.success?).to be true
      expect(response.data['domainAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.domain_invalid") })

      internal_graphql_execute(query, { domain: 'global' })
      expect(response.success?).to be true
      expect(response.data['domainAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.domain_invalid") })

      internal_graphql_execute(query, { domain: 'anonymous' })
      expect(response.success?).to be true
      expect(response.data['domainAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.domain_invalid") })
    end
  end
end
