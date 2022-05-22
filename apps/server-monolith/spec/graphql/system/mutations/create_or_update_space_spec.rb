# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe System::Mutations::CreateOrUpdateSpace, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation createOrUpdateSpace($input: CreateOrUpdateSpaceInput!) {
        createOrUpdateSpace(input: $input) {
          errors
          space {
            domain
            name
            inviteEnable
          }
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'update' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      new_name = 'NEWNAME'

      input = { input: { type: 'UPDATE', domain: user.personal_space.domain, name: new_name } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdateSpace][:errors]).to eq([])
      expect(response.data[:createOrUpdateSpace][:space][:name]).to eq(new_name)

      input = { input: { type: 'UPDATE', domain: user.personal_space.domain, inviteEnable: true } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdateSpace][:errors]).to eq([])
      expect(response.data[:createOrUpdateSpace][:space][:inviteEnable]).to be(true)

      input = { input: { type: 'UPDATE', domain: 'ERROR_DOMAIN', name: new_name } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdateSpace][:errors]).to eq([I18n.t('accounts.errors.space_not_exist')])

      self.current_user = nil
      self.current_space = nil
    end

    it 'create' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      new_domain = "new#{user.id}"
      new_name = 'NEWNAME'

      input = { input: { type: 'CREATE', domain: new_domain, name: new_name } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdateSpace][:errors]).to eq([])
      expect(response.data[:createOrUpdateSpace][:space][:name]).to eq(new_name)
      expect(response.data[:createOrUpdateSpace][:space][:domain]).to eq(new_domain)

      input = { input: { type: 'CREATE', domain: user.personal_space.domain, name: new_name } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdateSpace][:errors]).to eq([I18n.t('accounts.errors.space_exist')])

      self.current_user = nil
      self.current_space = nil
    end
  end
end
