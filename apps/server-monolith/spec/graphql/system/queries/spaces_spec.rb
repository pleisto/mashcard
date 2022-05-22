# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::Spaces, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetSpaces {
        spaces {
          id
          domain
          name
          personal
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
      internal_graphql_execute(query)

      expect(response.success?).to be false

      user = create(:accounts_user)
      self.current_user = user
      self.current_space = user.personal_space.as_session_context
      internal_graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data['spaces'].count).to eq(1)
      expect(response.data['spaces'][0]['domain']).to eq(user.domain)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
