# frozen_string_literal: true

require 'rails_helper'

describe System::Mutations::JoinPod, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation joinPod($input: JoinPodInput!) {
        joinPod(input: $input) {
          errors
        }
      }
    GRAPHQL

    it 'invalid pod' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context
      input = { input: { inviteSecret: "123123" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_pod'))
    end

    it 'already invited' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      user2 = create(:accounts_user)
      pod = user2.own_pods.create!(webid: "pod-disable-invite", name: "abc")
      pod.update!(invite_secret: SecureRandom.uuid, invite_enable: true)
      member = pod.members.create!(user_id: user.id, role: "member")

      input = { input: { inviteSecret: pod.invite_secret } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.already_invited'))

      member.disabled!

      input = { input: { inviteSecret: pod.invite_secret } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be true

      member.reload

      expect(member.state).to eq('enabled')
    end

    it 'pod disable invite' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      user2 = create(:accounts_user)
      pod = user2.own_pods.create!(webid: "pod-disable-invite", name: "abc")
      pod.update!(invite_secret: SecureRandom.uuid)

      input = { input: { inviteSecret: pod.invite_secret } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.pod_disable_invite'))
    end

    it 'work' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      user2 = create(:accounts_user)
      pod = user2.own_pods.create!(webid: "pod-disable-invite", name: "abc")
      pod.update!(invite_secret: SecureRandom.uuid, invite_enable: true)

      input = { input: { inviteSecret: pod.invite_secret } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be true
    end
  end
end
