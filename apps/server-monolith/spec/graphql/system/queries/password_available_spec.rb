# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::PasswordAvailable, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryPasswordAvailable($password: String!) {
        passwordAvailable(password: $password) {
          success
          message
        }
       }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(query, { password: 'test' })).to be true
    end

    it 'works' do
      internal_graphql_execute(query, { password: 'normal password' })
      expect(response.data['passwordAvailable']).to eq({ 'success' => true, 'message' => 'ok' })

      internal_graphql_execute(query, { password: 'short' })
      expect(response.data['passwordAvailable']).to eq({
        'success' => false,
        'message' => I18n.t('activerecord.errors.models.accounts/user.attributes.password.too_short'),
      })

      internal_graphql_execute(query, { password: '0' * 200 })
      ## TODO why it is a hash
      expect(response.data['passwordAvailable']).to eq({ 'success' => false,
'message' => I18n.t('errors.messages.too_long', count: 128).to_s, })
    end
  end
end
