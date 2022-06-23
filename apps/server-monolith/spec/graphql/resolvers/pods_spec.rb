# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Pods, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPods {
        pods {
          ... on User {
            id
            domain
            name
            type
            owned
            personal
            avatarData {
              url
              signedId
              downloadUrl
            }
            bio
          }
          ... on Group {
            id
            domain
            name
            type
            owned
            personal
            avatarData {
              url
              signedId
              downloadUrl
            }
            inviteEnable
            bio
          }
        }
      }
    GRAPHQL

    it 'works' do
      graphql_execute(query)

      expect(response.success?).to be false

      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      user.create_own_group!(username: 'podsSpec', display_name: 'PodsSpec')

      graphql_execute(query)

      expect(response.errors).to eq({})
      expect(response.success?).to be true
      expect(response.data['pods'].count).to eq(2)
      expect(response.data['pods'][0]['domain']).to eq(user.domain)
      expect(response.data['pods'][0]['type']).to eq('User')
      expect(response.data['pods'][0]['inviteEnable']).to be_nil
      expect(response.data['pods'][0]['personal']).to be(true)

      expect(response.data['pods'][1]['domain']).to eq('podsSpec')
      expect(response.data['pods'][1]['type']).to eq('Group')
      expect(response.data['pods'][1]['inviteEnable']).to be(false)
      expect(response.data['pods'][1]['personal']).to be(false)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
