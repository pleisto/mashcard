# frozen_string_literal: true

require 'rails_helper'

describe System::Mutations::UpdateMember, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation updateMember($input: UpdateMemberInput!) {
        updateMember(input: $input) {
          errors
       }
      }
    GRAPHQL

    it 'invalid pod' do
      self.current_pod = Pod::ANONYMOUS_CONTEXT
      input = { input: { webid: "123", role: "admin", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_pod'))
    end

    it 'invalid user' do
      user = create(:accounts_user)
      webid = "invalid-user-spec"
      pod = user.own_pods.create!(webid: webid, name: webid)

      self.current_user = user
      self.current_pod = pod.as_session_context

      input = { input: { webid: "foo bar", role: "admin", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_user'))
    end

    it 'invalid member' do
      user = create(:accounts_user)
      webid = "invalid-member-spec"
      pod = user.own_pods.create!(webid: webid, name: webid)

      self.current_user = user
      self.current_pod = pod.as_session_context

      user2 = create(:accounts_user)
      input = { input: { webid: user2.webid, role: "admin", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_member'))
    end

    it 'work' do
      user = create(:accounts_user)
      webid = "work-spec"
      pod = user.own_pods.create!(webid: webid, name: webid)

      self.current_user = user
      self.current_pod = pod.as_session_context

      user2 = create(:accounts_user)

      member = pod.members.create!(user_id: user2.id, role: 'admin')

      input = { input: { webid: user2.webid, role: "member", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.errors).to eq({})
      expect(response.data).to eq("updateMember" => nil)

      member.reload

      expect(member.role).to eq("member")
    end
  end
end
