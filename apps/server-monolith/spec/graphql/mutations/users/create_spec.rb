# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Users::Create, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation userCreate($input: UserCreateInput!) {
        userCreate(input: $input){
          errors
          isUserActive
        }
      }
    GRAPHQL

    it 'emailPassword sign up work' do
      variables = {
        input: {
          domain: 'machine-learning',
          name: FFaker::Name.name,
          email: FFaker::Internet.email(Time.now.to_i.to_s(36)),
          password: FFaker::Internet.password,
          locale: 'enUS',
          timezone: 'utc',
        },
      }
      graphql_execute(mutation, variables)
      expect(response.data[:userCreate][:errors]).to eq([])
      expect(response.data[:userCreate][:isUserActive]).to be false
    end

    it 'omniauth sign up work' do
      email = 'admin@github.com'
      domain = 'railsway'
      # omniauth session
      request.session[:omniauth] = {
        'provider' => :github,
        'uid' => Time.now.to_i,
        'info' => {
          'email' => email,
          'avatar' => nil,
        },
      }

      variables = {
        input: {
          domain: domain,
          name: FFaker::Name.name,
          locale: 'enUS',
          timezone: 'utc',
        },
      }

      graphql_execute(mutation, variables)
      expect(response.data[:userCreate][:isUserActive]).to be true
      expect(Users::Authentication.find_by(email: email).user.username).to eq(domain)
    end

    it 'email&password sign up requires password' do
      variables = {
        input: {
          domain: 'no-password-errors', name: FFaker::Name.name, locale: 'enUS', timezone: 'utc',
        },
      }
      graphql_execute(mutation, variables)
      expect(response.failure?).to be true
    end
  end
end
