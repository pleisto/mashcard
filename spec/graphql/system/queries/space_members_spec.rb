# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::SpaceMembers, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetSpaceUsers {
        spaceMembers {
          domain
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
      self.current_space = Space::ANONYMOUS_CONTEXT
      internal_graphql_execute(query)
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_space'))
      expect(response.data).to eq('spaceMembers' => nil)
    end

    it 'personal' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['spaceMembers'][0]['domain']).to eq(user.domain)
      expect(response.data['spaceMembers'][0]['role']).to eq('admin')
    end

    it 'group' do
      user = create(:accounts_user)
      domain = "group-spec"
      space = user.own_spaces.create!(domain: domain, name: domain)

      self.current_user = user
      self.current_space = space.as_session_context

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['spaceMembers'][0]['domain']).to eq(user.domain)
      expect(response.data['spaceMembers'][0]['name']).to eq(user.name)
      expect(response.data['spaceMembers'][0]['role']).to eq('admin')

      user2 = create(:accounts_user)
      member = space.members.create!(user_id: user2.id, role: :admin)

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['spaceMembers'].count).to eq(2)

      member.disabled!

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['spaceMembers'].count).to eq(1)
    end
  end
end
