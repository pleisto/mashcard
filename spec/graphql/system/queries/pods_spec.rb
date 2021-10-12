# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::Pods, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPods {
        pods {
          id
          webid
          name
          personal
          avatarData {
            url
            signedId
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
      self.current_pod = user.personal_pod.as_session_context
      internal_graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data['pods'].count).to eq(1)
      expect(response.data['pods'][0]['webid']).to eq(user.webid)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
