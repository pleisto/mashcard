# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Pod, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPod($domain: String!) {
        pod(domain: $domain) {
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

    it 'unauthenticated user' do
      graphql_execute(query, { domain: 'foo-bar' })
      expect(response.success?).to be false
    end

    it 'invalid' do
      user = create(:accounts_user)
      self.current_user = user
      graphql_execute(query, { domain: 'invalid domain' })

      expect(response.success?).to be false
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.invalid_pod'))

      self.current_user = nil
    end

    it 'works' do
      user = create(:accounts_user)
      self.current_user = user
      graphql_execute(query, { domain: user.domain })

      expect(response.success?).to be true
      expect(response.data['pod']['domain']).to eq(user.domain)

      self.current_user = nil
    end
  end
end
