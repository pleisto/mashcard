# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::BlockShareLinks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockShareLinks($id: String!) {
        blockShareLinks(id: $id) {
          key
          policy
          state
          shareSpaceData {
            domain
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
      space = create(:space)
      self.current_space = space.as_session_context
      block = create(:docs_block, space: space, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockShareLinks' => [] })

      block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'enabled', policy: 'view'])
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockShareLinks'][0]['shareSpaceData']['domain']).to eq(Space::ANYONE_DOMAIN)

      block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'disabled', policy: 'view'])
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockShareLinks'][0]['state']).to eq('disabled')

      self.current_user = nil
      self.current_space = nil
    end
  end
end
