# frozen_string_literal: true

require 'rails_helper'

describe Accounts::Mutations::UserCreate, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userCreate($input: UserCreateInput!) {
        userCreate(input: $input){
          errors
          isUserActive
        }
      }
    GRAPHQL

    it 'only available on internal apis entrypoint' do
      expect(unavailable_on_openapi(mutation)).to be true
    end

    it 'emailPassword sign up work' do
      variables = {
        input: {
          webid: 'machine-learning',
          name: FFaker::Name.name,
          email: FFaker::Internet.email(Time.now.to_i.to_s(36)),
          password: FFaker::Internet.password,
          locale: 'enUS',
          timezone: 'utc'
        }
      }
      internal_graphql_execute(mutation, variables)
      expect(response.data[:userCreate][:errors]).to eq([])
      expect(response.data[:userCreate][:isUserActive]).to be false
    end

    it 'omniauth sign up work' do
      email = 'admin@github.com'
      webid = 'railsway'
      # omniauth session
      request.session[:omniauth] = {
        'provider' => :github,
        'uid' => Time.now.to_i,
        'info' => {
          'email' => email,
          'avatar' => nil
        }
      }

      variables = {
        input: {
          webid: webid,
          name: FFaker::Name.name,
          locale: 'enUS',
          timezone: 'utc'
        }
      }

      internal_graphql_execute(mutation, variables)
      expect(response.data[:userCreate][:isUserActive]).to be true
      expect(Accounts::User.find_by(email: email).webid).to eq(webid)
    end

    it 'email&password sign up requires password' do
      variables = {
        input: {
          webid: 'no-password-errors', name: FFaker::Name.name, locale: 'enUS', timezone: 'utc'
        }
      }
      internal_graphql_execute(mutation, variables)
      expect(response.failure?).to be true
    end
  end
end
