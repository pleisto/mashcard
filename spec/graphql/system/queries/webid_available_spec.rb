# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::WebidAvailable, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryWebidAvailable($webid: String!) {
         webidAvailable(webid: $webid) {
          success
          message
        }
       }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(query, { webid: 'test' })).to be true
    end

    it 'works' do
      internal_graphql_execute(query, { webid: 'admin' })
      expect(response.success?).to be true
      expect(response.data['webidAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.webid_invalid") })

      internal_graphql_execute(query, { webid: 'global' })
      expect(response.success?).to be true
      expect(response.data['webidAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.webid_invalid") })

      internal_graphql_execute(query, { webid: 'legitimate-name-example' })
      expect(response.data['webidAvailable']).to eq({ "success" => true, "message" => "ok" })

      internal_graphql_execute(query, { webid: 'legitimate@name-example' })
      expect(response.data['webidAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.webid_invalid") })
    end

    it 'expect webid uniqueness' do
      stub = create(:pod)
      internal_graphql_execute(query, { webid: stub.webid })
      expect(response.data['webidAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.taken") })
    end
  end
end
