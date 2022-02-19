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

    it 'invalid space' do
      self.current_space = Space::ANONYMOUS_CONTEXT
      input = { input: { domain: "123", role: "admin", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_space'))
    end

    it 'invalid user' do
      user = create(:accounts_user)
      domain = "invalid-user-spec"
      space = user.own_spaces.create!(domain: domain, name: domain)

      self.current_user = user
      self.current_space = space.as_session_context

      input = { input: { domain: "foo bar", role: "admin", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_user'))
    end

    it 'invalid member' do
      user = create(:accounts_user)
      domain = "invalid-member-spec"
      space = user.own_spaces.create!(domain: domain, name: domain)

      self.current_user = user
      self.current_space = space.as_session_context

      user2 = create(:accounts_user)
      input = { input: { domain: user2.domain, role: "admin", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_member'))
    end

    it 'work' do
      user = create(:accounts_user)
      domain = "work-spec"
      space = user.own_spaces.create!(domain: domain, name: domain)

      self.current_user = user
      self.current_space = space.as_session_context

      user2 = create(:accounts_user)

      member = space.members.create!(user_id: user2.id, role: 'admin')

      input = { input: { domain: user2.domain, role: "member", state: "enabled" } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.errors).to eq({})
      expect(response.data).to eq("updateMember" => nil)

      member.reload

      expect(member.role).to eq("member")
    end
  end
end
