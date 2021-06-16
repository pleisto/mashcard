# frozen_string_literal: true

require 'rails_helper'

describe Accounts::Queries::AccountsWebidAvailable, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryAccountWebidAvailable($webid: String!) {
         accountsWebidAvailable(webid: $webid)
       }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(query, { webid: 'test' })).to be true
    end

    it 'works' do
      internal_graphql_execute(query, { webid: 'admin' })
      expect(response.success?).to be true
      expect(response.data['accountsWebidAvailable']).to be false
      internal_graphql_execute(query, { webid: 'legitimate-name-example' })
      expect(response.data['accountsWebidAvailable']).to be true
    end

    it 'expect webid uniqueness' do
      stub = create(:accounts_team)
      internal_graphql_execute(query, { webid: stub.webid })
      expect(response.data['accountsWebidAvailable']).to be false
    end
  end
end
