# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Groups::Join, type: :mutation, focus: true do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation groupJoin($input: GroupJoinInput!) {
        groupJoin(input: $input) {
          errors
        }
      }
    GRAPHQL

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
