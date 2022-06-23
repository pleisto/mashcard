# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::PasswordAvailable, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryPasswordAvailable($password: String!) {
        passwordAvailable(password: $password) {
          success
          message
        }
       }
    GRAPHQL

    it 'works' do
      graphql_execute(query, { password: 'normal password' })
      expect(response.data['passwordAvailable']).to eq({ 'success' => true, 'message' => 'ok' })

      graphql_execute(query, { password: 'short' })
      expect(response.data['passwordAvailable']).to eq({
        'success' => false,
        'message' => I18n.t('errors.messages.too_short', count: 8),
      })

      graphql_execute(query, { password: '0' * 200 })
      ## TODO why it is a hash
      expect(response.data['passwordAvailable']).to eq({ 'success' => false,
'message' => I18n.t('errors.messages.too_long', count: 128).to_s, })
    end
  end
end
