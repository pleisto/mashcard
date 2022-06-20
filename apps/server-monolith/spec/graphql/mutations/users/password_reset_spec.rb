# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Users::PasswordReset, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userPasswordReset($input: UserPasswordResetInput!) {
        userPasswordReset(input: $input){
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'checks token exists' do
      graphql_execute(mutation, { input: { token: FFaker::Guid.guid, password: FFaker::Internet.password } })
      expect(response.data[:userPasswordReset][:errors][0]).to eq(I18n.t('devise.passwords.no_token'))
    end

    it 'token expired' do
      token = user.authentication.send_reset_password_instructions
      user.authentication.update!(reset_password_sent_at: user.authentication.reset_password_sent_at - 3.hours)
      expect(user.authentication.reset_password_period_valid?).to be(false)

      graphql_execute(mutation, { input: { token: token, password: FFaker::Internet.password } })

      expect(response.data[:userPasswordReset][:errors][0]).to eq(I18n.t('devise.failure.reset_password_token_expired'))
    end

    it 'password too short' do
      token = user.authentication.send_reset_password_instructions
      graphql_execute(mutation, { input: { token: token, password: 'foo' } })
      expect(response.data[:userPasswordReset][:errors][0]).to eq(
        "Password #{I18n.t('errors.messages.too_short', count: 8)}"
      )
    end

    it 'works' do
      token = user.authentication.send_reset_password_instructions

      expect(user.authentication.reset_password_period_valid?).to be(true)

      expect(Devise.token_generator.digest(Users::Authentication, :reset_password_token,
        token)).to eq(user.authentication.reset_password_token)
      password = FFaker::Internet.password

      expect(user.authentication.valid_password?(password)).to be(false)
      graphql_execute(mutation, { input: { token: token, password: password } })

      expect(response.data[:userPasswordReset][:errors]).to eq([])

      ## NOTE should reload
      expect(user.authentication.valid_password?(password)).to be(false)

      user.reload
      expect(user.authentication.valid_password?(password)).to be(true)
    end
  end
end
