# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe Accounts::Mutations::UserPasswordReset, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userPasswordReset($input: UserPasswordResetInput!) {
        userPasswordReset(input: $input){
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(mutation)).to be true
    end

    it 'checks token exists' do
      internal_graphql_execute(mutation, { input: { token: FFaker::Guid.guid, password: FFaker::Internet.password } })
      expect(response.data[:userPasswordReset][:errors][0]).to eq(I18n.t('devise.passwords.no_token'))
    end

    it 'token expired' do
      token = user.send_reset_password_instructions
      user.update!(reset_password_sent_at: user.reset_password_sent_at - 3.hours)
      expect(user.reset_password_period_valid?).to be(false)

      internal_graphql_execute(mutation, { input: { token: token, password: FFaker::Internet.password } })

      expect(response.data[:userPasswordReset][:errors][0]).to eq(I18n.t('devise.failure.reset_password_token_expired'))
    end

    it 'password too short' do
      token = user.send_reset_password_instructions
      internal_graphql_execute(mutation, { input: { token: token, password: 'foo' } })
      expect(response.data[:userPasswordReset][:errors][0]).to eq(
        "Password #{I18n.t('activerecord.errors.models.accounts/user.attributes.password.too_short')}"
      )
    end

    it 'works' do
      token = user.send_reset_password_instructions

      expect(user.reset_password_period_valid?).to be(true)

      expect(Devise.token_generator.digest(Accounts::User, :reset_password_token,
        token)).to eq(user.reset_password_token)
      password = FFaker::Internet.password

      expect(user.valid_password?(password)).to be(false)
      internal_graphql_execute(mutation, { input: { token: token, password: password } })

      expect(response.data[:userPasswordReset][:errors]).to eq([])

      ## NOTE should reload
      expect(user.valid_password?(password)).to be(false)

      user.reload
      expect(user.valid_password?(password)).to be(true)
    end
  end
end
