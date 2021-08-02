# frozen_string_literal: true

require 'rails_helper'

describe System::Mutations::CreateOrUpdatePod, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation createOrUpdatePod($input: CreateOrUpdatePodInput!) {
        createOrUpdatePod(input: $input) {
          errors
          pod {
            webid
            name
          }
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'update' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      new_name = "NEWNAME"

      input = { input: { type: "UPDATE", webid: user.personal_pod.webid, name: new_name } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([])
      expect(response.data[:createOrUpdatePod][:pod][:name]).to eq(new_name)

      input = { input: { type: "UPDATE", webid: "ERROR_WEBID", name: new_name } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([I18n.t('accounts.errors.pod_not_exist')])

      self.current_user = nil
      self.current_pod = nil
    end

    it 'create' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      new_webid = "new#{user.id}"
      new_name = "NEWNAME"

      input = { input: { type: "CREATE", webid: new_webid, name: new_name } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([])
      expect(response.data[:createOrUpdatePod][:pod][:name]).to eq(new_name)
      expect(response.data[:createOrUpdatePod][:pod][:webid]).to eq(new_webid)

      input = { input: { type: "CREATE", webid: user.personal_pod.webid, name: new_name } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data[:createOrUpdatePod][:errors]).to eq([I18n.t('accounts.errors.pod_exist')])

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
