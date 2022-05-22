# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::Space, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetSpace($domain: String!) {
        space(domain: $domain) {
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
      internal_graphql_execute(query, { domain: 'foo-bar' })

      expect(response.success?).to be false

      user = create(:accounts_user)
      self.current_user = user
      self.current_space = user.personal_space.as_session_context
      internal_graphql_execute(query, { domain: user.domain })

      expect(response.success?).to be true
      expect(response.data['space']['domain']).to eq(user.domain)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
