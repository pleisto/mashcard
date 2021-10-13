# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::Pod, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPod($webid: String!) {
        pod(webid: $webid) {
          id
          webid
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
      internal_graphql_execute(query, { webid: 'foo-bar' })

      expect(response.success?).to be false

      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context
      internal_graphql_execute(query, { webid: user.webid })

      expect(response.success?).to be true
      expect(response.data['pod']['webid']).to eq(user.webid)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
