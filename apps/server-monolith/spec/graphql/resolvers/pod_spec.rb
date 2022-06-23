# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Pod, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPod($domain: String!) {
        pod(domain: $domain) {
          id
          domain
          type
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

    it 'unauthenticated user' do
      graphql_execute(query, { domain: 'foo-bar' })
      expect(response.success?).to be false
    end

    it 'invalid' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context
      graphql_execute(query, { domain: 'invalid domain' })

      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_pod'))

      self.current_user = nil
      self.current_pod = nil
    end

    it 'works' do
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
