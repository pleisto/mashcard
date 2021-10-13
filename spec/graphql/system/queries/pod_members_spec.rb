# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::PodMembers, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPodUsers {
        podMembers {
          webid
          email
          name
          role
          state
          avatarData {
            url
            signedId
            downloadUrl
          }
        }
      }
    GRAPHQL

    it 'invalid' do
      self.current_pod = Pod::ANONYMOUS_CONTEXT
      internal_graphql_execute(query)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_pod'))
      expect(response.data).to eq('podMembers' => nil)
    end

    it 'personal' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['podMembers'][0]['webid']).to eq(user.webid)
      expect(response.data['podMembers'][0]['role']).to eq('admin')
    end

    it 'group' do
      user = create(:accounts_user)
      webid = "group-spec"
      pod = user.own_pods.create!(webid: webid, name: webid)

      self.current_user = user
      self.current_pod = pod.as_session_context

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['podMembers'][0]['webid']).to eq(user.webid)
      expect(response.data['podMembers'][0]['name']).to eq(user.name)
      expect(response.data['podMembers'][0]['role']).to eq('admin')

      user2 = create(:accounts_user)
      member = pod.members.create!(user_id: user2.id, role: :admin)

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['podMembers'].count).to eq(2)

      member.disabled!

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['podMembers'].count).to eq(1)
    end
  end
end
