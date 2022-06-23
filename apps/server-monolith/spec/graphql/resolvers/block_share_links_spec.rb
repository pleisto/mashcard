# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::BlockShareLinks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockShareLinks($id: String!) {
        blockShareLinks(id: $id) {
          key
          policy
          state
          sharePodData {
            domain
            name
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

      graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockShareLinks' => [] })

      block.upsert_share_links!([domain: Pod::ANYONE_DOMAIN, state: 'enabled', policy: 'view'])
      graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockShareLinks'][0]['sharePodData']['domain']).to eq(Pod::ANYONE_DOMAIN)

      block.upsert_share_links!([domain: Pod::ANYONE_DOMAIN, state: 'disabled', policy: 'view'])
      graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockShareLinks'][0]['state']).to eq('disabled')

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
