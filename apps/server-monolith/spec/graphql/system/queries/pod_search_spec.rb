# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::PodSearch, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query QueryPodSearch($input: String!) {
        podSearch(input: $input) {
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
      self.current_pod = user.personal_pod.as_session_context

      internal_graphql_execute(query, { input: '' })
      expect(response.success?).to be(true)
      expect(response.data['podSearch']).to eq([])

      internal_graphql_execute(query, { input: 'foo_bar' })
      expect(response.success?).to be(true)
      expect(response.data['podSearch']).to eq([])

      internal_graphql_execute(query, { input: user.domain })
      expect(response.success?).to be(true)
      expect(response.data['podSearch'][0]['domain']).to eq(user.domain)

      internal_graphql_execute(query, { input: user.domain.upcase })
      expect(response.success?).to be(true)
      expect(response.data['podSearch'][0]['domain']).to eq(user.domain)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
