# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::PodSearch, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query QueryPodSearch($input: String!) {
        podSearch(input: $input) {
          domain
          name
          type
          avatarData {
            url
          }
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'works' do
      self.current_user = user

      graphql_execute(query, { input: '' })
      expect(response.success?).to be(true)
      expect(response.data['podSearch']).to eq([])

      graphql_execute(query, { input: 'foo_bar' })
      expect(response.success?).to be(true)
      expect(response.data['podSearch']).to eq([])

      graphql_execute(query, { input: user.domain })
      expect(response.success?).to be(true)
      expect(response.data['podSearch'][0]['domain']).to eq(user.domain)

      graphql_execute(query, { input: user.domain.upcase })
      expect(response.success?).to be(true)
      expect(response.data['podSearch'][0]['domain']).to eq(user.domain)

      self.current_user = nil
    end
  end
end
