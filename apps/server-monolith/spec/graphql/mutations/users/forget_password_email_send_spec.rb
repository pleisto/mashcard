# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Users::ForgetPasswordMailSend, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userForgetPasswordMailSend($input: UserForgetPasswordMailSendInput!) {
        userForgetPasswordMailSend(input: $input){
          errors
        }
      }
    GRAPHQL

    it 'email format invalid' do
      graphql_execute(mutation, { input: { email: 'foo' } })
      expect(response.data).to eq({})
      expect(response.errors[0]['message']).to include('is not a valid email address')
    end

    it 'checks email address exists' do
      graphql_execute(mutation, { input: { email: FFaker::Internet.email } })
      expect(response.data[:userForgetPasswordMailSend][:errors][0]).to eq("Email #{I18n.t('errors.messages.not_found')}")
    end

    it 'work' do
      user = create(:accounts_user)
      graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userForgetPasswordMailSend][:errors]).to eq([])

      expect(user.reset_password_token).to be_nil
      user.reload
      expect(user.reset_password_token).not_to be_nil
      expect(user.reset_password_sent_at).not_to be_nil

      graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userForgetPasswordMailSend][:errors]).to eq([I18n.t('errors.messages.send_interval')])
    end
  end
end
