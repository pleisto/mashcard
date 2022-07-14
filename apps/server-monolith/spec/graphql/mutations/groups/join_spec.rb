# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Groups::Join, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation groupJoin($input: GroupJoinInput!) {
        groupJoin(input: $input) {
          errors
        }
      }
    TEXT

    it 'invalid secret' do
      user = create(:accounts_user)
      self.current_user = user
      input = { input: { inviteSecret: 'invalid string' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupJoin' => { 'errors' => [I18n.t('errors.graphql.argument_error.invalid_pod')] })
    end

    it 'disabled' do
      user = create(:accounts_user)
      self.current_user = user

      user2 = create(:accounts_user)
      domain = "#{user2.id}-group"
      group = user2.create_own_group!(username: domain, display_name: domain)

      group.invite_enable = true
      invite_secret = group.invite_secret
      group.invite_enable = false

      input = { input: { inviteSecret: invite_secret } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupJoin' => { 'errors' => [I18n.t('errors.graphql.argument_error.pod_disable_invite')] })
    end

    it 'create or enable' do
      user = create(:accounts_user)
      self.current_user = user

      user2 = create(:accounts_user)
      domain = "#{user2.id}-group"
      group = user2.create_own_group!(username: domain, display_name: domain)

      group.invite_enable = true
      invite_secret = group.invite_secret

      input = { input: { inviteSecret: invite_secret } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupJoin' => { 'errors' => [] })

      member = group.members.find_by(user_id: user.id)
      expect(member).not_to be_nil

      member.disabled!
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupJoin' => { 'errors' => [] })

      member.reload
      expect(member.state).to eq('enabled')

      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupJoin' => { 'errors' => [I18n.t('errors.graphql.argument_error.already_invited')] })

      self.current_user = nil
    end
  end
end
