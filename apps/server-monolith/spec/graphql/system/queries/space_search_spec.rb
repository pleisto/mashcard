# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::SpaceSearch, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query QuerySpaceSearch($input: String!) {
        spaceSearch(input: $input) {
          domain
          name
          avatarData {
            url
          }
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'works' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      internal_graphql_execute(query, { input: '' })
      expect(response.success?).to be(true)
      expect(response.data['spaceSearch']).to eq([])

      internal_graphql_execute(query, { input: 'foo_bar' })
      expect(response.success?).to be(true)
      expect(response.data['spaceSearch']).to eq([])

      internal_graphql_execute(query, { input: user.domain })
      expect(response.success?).to be(true)
      expect(response.data['spaceSearch'][0]['domain']).to eq(user.domain)

      internal_graphql_execute(query, { input: user.domain.upcase })
      expect(response.success?).to be(true)
      expect(response.data['spaceSearch'][0]['domain']).to eq(user.domain)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
