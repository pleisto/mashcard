# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Pods, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPods {
        pods {
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
      graphql_execute(query)

      expect(response.success?).to be false

      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context
      graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data['pods'].count).to eq(1)
      expect(response.data['pods'][0]['domain']).to eq(user.domain)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
