# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Users::ConfirmationEmailResend, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userConfirmationEmailResend($input: UserConfirmationEmailResendInput!) {
        userConfirmationEmailResend(input: $input){
          errors
        }
      }
    GRAPHQL

    it 'emails address exists' do
      graphql_execute(mutation, { input: { email: FFaker::Internet.email } })
      expect(response.data[:userConfirmationEmailResend][:errors][0]).to start_with('Email')
    end

    it 'work' do
      user = create(:accounts_user_not_confirmed)
      graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userConfirmationEmailResend][:errors]).to eq([])
      graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userConfirmationEmailResend][:errors]).to eq([I18n.t('errors.messages.send_interval')])
    end
  end
end
