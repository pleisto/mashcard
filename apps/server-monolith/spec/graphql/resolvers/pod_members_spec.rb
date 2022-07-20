# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::PodMembers, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPodMembers($username: String!) {
        podMembers(username: $username) {
          role
          state
          user {
            domain
            name
            avatarData {
              url
              signedId
              downloadUrl
            }
          }
        }
      }
    GRAPHQL

    it 'invalid' do
      graphql_execute(query, { username: 'anonymous' })
      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_pod'))
      expect(response.data).to eq('podMembers' => nil)
    end

    it 'personal' do
      user = create(:accounts_user)
      self.current_user = user

      graphql_execute(query, { username: user.username })
      expect(response.success?).to be true
      expect(response.data['podMembers'].length).to eq(0)
    end

    it 'group' do
      user = create(:accounts_user)
      domain = 'group-spec'
      pod = user.create_own_group!(username: domain, display_name: domain)

      self.current_user = user

      graphql_execute(query, { username: pod.username })
      expect(response.success?).to be true
      expect(response.data['podMembers'][0]['user']['domain']).to eq(user.domain)
      expect(response.data['podMembers'][0]['user']['name']).to eq(user.name)
      expect(response.data['podMembers'][0]['role']).to eq('owner')

      user2 = create(:accounts_user)
      member = pod.members.create!(user_id: user2.id, role: :admin)

      graphql_execute(query, { username: pod.username })
      expect(response.success?).to be true
      expect(response.data['podMembers'].count).to eq(2)

      member.disabled!

      graphql_execute(query, { username: pod.username })
      expect(response.success?).to be true
      expect(response.data['podMembers'].count).to eq(1)
    end
  end
end
