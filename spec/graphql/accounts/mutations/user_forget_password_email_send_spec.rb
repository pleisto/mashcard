# frozen_string_literal: true

require 'rails_helper'

describe Accounts::Mutations::UserForgetPasswordMailSend, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userForgetPasswordMailSend($input: UserForgetPasswordMailSendInput!) {
        userForgetPasswordMailSend(input: $input){
          errors
        }
      }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(mutation)).to be true
    end

    it 'email format invalid' do
      internal_graphql_execute(mutation, { input: { email: "foo" } })
      expect(response.data).to eq({})
      expect(response.errors[0]['message']).to include('is not a valid email address')
    end

    it 'should check email address exists' do
      internal_graphql_execute(mutation, { input: { email: FFaker::Internet.email } })
      expect(response.data[:userForgetPasswordMailSend][:errors][0]).to eq("Email #{I18n.t('errors.messages.not_found')}")
    end

    it 'work' do
      user = create(:accounts_user)
      internal_graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userForgetPasswordMailSend][:errors]).to eq([])

      expect(user.reset_password_token).to be(nil)
      user.reload
      expect(user.reset_password_token).not_to be(nil)
      expect(user.reset_password_sent_at).not_to be(nil)

      internal_graphql_execute(mutation, { input: { email: user.email } })
      expect(response.data[:userForgetPasswordMailSend][:errors]).to eq([I18n.t('errors.messages.send_interval')])
    end
  end
end
