# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Groups::UpdateMember, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation groupUpdateMember($input: GroupUpdateMemberInput!) {
        groupUpdateMember(input: $input) {
          errors
        }
      }
    GRAPHQL

    it 'invalid pod' do
      self.current_pod = Pod::ANONYMOUS_CONTEXT
      input = { input: { domain: '123', role: 'admin', state: 'enabled' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_pod'))
    end

    it 'invalid user' do
      user = create(:accounts_user)
      domain = 'invalid-user-spec'
      pod = user.create_own_group!(username: domain, display_name: domain)

      self.current_user = user
      self.current_pod = pod.as_session_context

      input = { input: { domain: 'foo bar', role: 'admin', state: 'enabled' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_user'))
    end

    it 'invalid member' do
      user = create(:accounts_user)
      domain = 'invalid-member-spec'
      pod = user.create_own_group!(username: domain, display_name: domain)

      self.current_user = user
      self.current_pod = pod.as_session_context

      user2 = create(:accounts_user)
      input = { input: { domain: user2.username, role: 'admin', state: 'enabled' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_member'))
    end

    it 'work' do
      user = create(:accounts_user)
      domain = 'work-spec'
      pod = user.create_own_group!(username: domain, display_name: domain)

      self.current_user = user
      self.current_pod = pod.as_session_context

      user2 = create(:accounts_user)

      member = pod.members.create!(user_id: user2.id, role: 'admin')

      input = { input: { domain: user2.username, role: 'member', state: 'enabled' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.errors).to eq({})
      expect(response.data).to eq('groupUpdateMember' => nil)

      member.reload

      expect(member.role).to eq('member')
    end
  end
end
