# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Users::EmailPasswordSignIn, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userEmailPasswordSignIn($input: UserEmailPasswordSignInInput!) {
        userEmailPasswordSignIn(input: $input){
          errors
          redirectPath
        }
      }
    GRAPHQL

    let(:password) { FFaker::Internet.password }
    let(:user) { create(:accounts_user, password: password) }

    it 'works' do
      input = { input: { email: user.email, password: password, remember: false } }
      graphql_execute(mutation, input)
      expect(response.data[:userEmailPasswordSignIn][:redirectPath]).not_to be_blank
    end

    it 'returnses invalid password message' do
      input = { input: { email: user.email, password: 'wrong-pwd', remember: false } }
      graphql_execute(mutation, input)
      error_message = I18n.t('devise.failure.invalid', authentication_keys: 'email')
      expect(response.data[:userEmailPasswordSignIn][:errors][0]).to eq(error_message)
    end
  end
end
