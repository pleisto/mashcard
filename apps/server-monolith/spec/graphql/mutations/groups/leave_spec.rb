# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Groups::Leave, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation groupLeave($input: GroupLeaveInput!) {
        groupLeave(input: $input) {
          errors
        }
      }
    TEXT

    it 'invalid group' do
      user = create(:accounts_user)
      self.current_user = user

      input = { input: { domain: 'invalid', userDomain: 'invalid' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupLeave' => { 'errors' => [I18n.t('settings.errors.invalid_operation_type')] })
    end

    it 'invalid user' do
      user = create(:accounts_user)
      self.current_user = user
      domain = "#{user.id}-group"
      user.create_own_group!(username: domain, display_name: domain)

      input = { input: { domain: domain, userDomain: 'invalid' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupLeave' => { 'errors' => [I18n.t('settings.errors.invalid_operation_type')] })
    end

    it 'ok' do
      user = create(:accounts_user)
      self.current_user = user
      domain = "#{user.id}-group"
      group = user.create_own_group!(username: domain, display_name: domain)
      user2 = create(:accounts_user)
      group.members.create!(user_id: user2.id, role: :member)

      input = { input: { domain: domain, userDomain: user2.username } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data).to eq('groupLeave' => { 'errors' => [] })

      group.members.reload
      expect(group.members.count).to eq(1)
    end
  end
end
