# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Pod, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPod($domain: String!) {
        pod(domain: $domain) {
          id
          domain
          name
          personal
          inviteEnable
          inviteSecret
          avatarData {
            url
            signedId
            downloadUrl
          }
          bio
        }
      }
    GRAPHQL

    it 'works' do
      graphql_execute(query, { domain: 'foo-bar' })

      expect(response.success?).to be false

      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context
      graphql_execute(query, { domain: user.domain })

      expect(response.success?).to be true
      expect(response.data['pod']['domain']).to eq(user.domain)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
