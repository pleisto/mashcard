# frozen_string_literal: true

require 'rails_helper'

describe System::Mutations::CreateOrUpdatePod, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation createOrUpdatePod($input: CreateOrUpdatePodInput!) {
        createOrUpdatePod(input: $input) {
          errors
          pod {
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
      self.current_pod = user.personal_pod.as_session_context

      new_name = 'NEWNAME'

      input = { input: { type: 'UPDATE', domain: user.personal_pod.domain, name: new_name } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([])
      expect(response.data[:createOrUpdatePod][:pod][:name]).to eq(new_name)

      input = { input: { type: 'UPDATE', domain: user.personal_pod.domain, inviteEnable: true } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([])
      expect(response.data[:createOrUpdatePod][:pod][:inviteEnable]).to be(true)

      input = { input: { type: 'UPDATE', domain: 'ERROR_DOMAIN', name: new_name } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([I18n.t('accounts.errors.pod_not_exist')])

      self.current_user = nil
      self.current_pod = nil
    end

    it 'create' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      new_domain = "new#{user.id}"
      new_name = 'NEWNAME'

      input = { input: { type: 'CREATE', domain: new_domain, name: new_name } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([])
      expect(response.data[:createOrUpdatePod][:pod][:name]).to eq(new_name)
      expect(response.data[:createOrUpdatePod][:pod][:domain]).to eq(new_domain)

      input = { input: { type: 'CREATE', domain: user.personal_pod.domain, name: new_name } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([I18n.t('accounts.errors.pod_exist')])

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
