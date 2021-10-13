# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::BlockShareLinks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockShareLinks($id: String!) {
        blockShareLinks(id: $id) {
          key
          shareWebid
          policy
          state
          sharePodData {
            name
            email
            avatarData {
              url
              signedId
              downloadUrl
            }
          }
        }
      }
    GRAPHQL

    it 'global' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockShareLinks' => [] })

      block.upsert_share_links!([webid: Pod::ANYONE_WEBID, state: 'enabled', policy: 'view'])
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockShareLinks'][0]['shareWebid']).to eq(Pod::ANYONE_WEBID)

      block.upsert_share_links!([webid: Pod::ANYONE_WEBID, state: 'disabled', policy: 'view'])
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockShareLinks'][0]['state']).to eq('disabled')

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
