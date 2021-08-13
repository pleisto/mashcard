# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::EmailAvailable, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryEmailAvailable($email: String!) {
         emailAvailable(email: $email) {
           success
           message
         }
       }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(query, { email: 'test' })).to be true
    end

    it 'works' do
      internal_graphql_execute(query, { email: 'legitimate name example' })
      expect(response.data['emailAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.invalid") })
    end

    it 'expect email uniqueness' do
      stub = create(:accounts_user)
      internal_graphql_execute(query, { email: stub.email })
      expect(response.data['emailAvailable']).to eq({ "success" => false, "message" => I18n.t("errors.messages.taken") })

      internal_graphql_execute(query, { email: "legitimate@brickdoc.com" })
      expect(response.data['emailAvailable']).to eq({ "success" => true, "message" => "ok" })
    end
  end
end
