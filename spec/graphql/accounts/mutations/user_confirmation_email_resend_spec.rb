# frozen_string_literal: true

require 'rails_helper'

describe Accounts::Mutations::UserConfirmationEmailResend, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userConfirmationEmailResend($input: UserConfirmationEmailResendInput!) {
        userConfirmationEmailResend(input: $input){
          errors
        }
      }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(mutation)).to be true
    end

    it 'should email address exists' do
      internal_graphql_execute(mutation, { input: { email: FFaker::Internet.email } })
      expect(response.data[:userConfirmationEmailResend][:errors][0]).to start_with('Email')
    end

    it 'work' do
      user = create(:accounts_user)
      internal_graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userConfirmationEmailResend][:errors]).to eq([])
      internal_graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userConfirmationEmailResend][:errors]).to eq([I18n.t('errors.messages.send_interval')])
    end
  end
end
