# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::Block, type: :query do
  describe '#resolver' do
    it 'check permission' do
      user = create(:accounts_user)
      self.current_user = user

      pod = create(:pod)

      self.current_pod = pod.as_session_context

      block1 = create(:docs_block, pod: pod)
      block2 = create(:docs_block, pod: pod, collaborators: [user.id])
      child1 = create(:docs_block, pod: pod, sort: 100, collaborators: [user.id], parent: block2)
      child2 = create(:docs_block, pod: pod, sort: 200, collaborators: [user.id], parent: block2)
      child3 = create(:docs_block, pod: pod, sort: 300, collaborators: [user.id], parent: block2)

      # block
      query = <<-'GRAPHQL'
        query GetBlock($id: String!) {
          block(id: $id) {
            id
            permissions {
              canShow {
                value
              }
            }
          }
        }
      GRAPHQL

      expect do
        internal_graphql_execute(query, { id: block1.id })
      end.to raise_error('Not Authorized')

      internal_graphql_execute(query, { id: block2.id })
      expect(response.success?).to be true
      expect(response.data['block']['id']).to eq block2.id
      expect(response.data['block']['permissions']['canShow']['value']).to eq true

      # pageBlocks
      query = <<-'GRAPHQL'
        query GetPageBlocks($webid: String!) {
          pageBlocks(webid: $webid) {
            id
            sort
            parentId
            nextSort
            type
            data {
              text
              content
            }
            meta {
              cover {
                ... on BlockImage {
                  url
                }
                ... on BlockColor {
                  color
                }
              }
              icon {
                ... on BlockImage {
                  url
                }

                ... on BlockEmoji {
                  name
                  emoji
                }
              }
            }
          }
        }
      GRAPHQL

      internal_graphql_execute(query, { webid: pod.webid })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].length).to eq 4
      root = response.data['pageBlocks'].find { |b| b.fetch('parentId').nil? }
      expect(root['id']).to eq block2.id
      expect(root['nextSort'].class).to eq String
      expect(root['nextSort'].to_i).to_not eq 0
      sort_map = {
        block2.id => [Docs::Block::SORT_GAP, Docs::Block::SORT_GAP * 2], ## NOTE cuz authorized_scope
        child1.id => [0, Docs::Block::SORT_GAP * 1],
        child2.id => [Docs::Block::SORT_GAP * 1, Docs::Block::SORT_GAP * 2],
        child3.id => [Docs::Block::SORT_GAP * 2, Docs::Block::SORT_GAP * 3]
      }
      expect(response.data['pageBlocks'].each_with_object({}) { |x, h| h[x['id']] = [x['sort'].to_i, x['nextSort'].to_i] }).to eq(sort_map)
      expect(child2.reload.sort).to eq(Docs::Block::SORT_GAP)

      # childrenBlocks
      _block3 = create(:docs_block, parent: block2)
      block4 = create(:docs_block, parent: block2, collaborators: [user.id])

      query = <<-'GRAPHQL'
        query GetChildrenBlocks($parent_id: String!, $snapshot_version: Int!) {
          childrenBlocks(parentId: $parent_id, snapshotVersion: $snapshot_version) {
            id
          }
        }
      GRAPHQL

      internal_graphql_execute(query, { parent_id: block2.id, snapshot_version: 0 })

      expect(response.success?).to be true
      expect(response.data['childrenBlocks'].length).to eq 5
      expect(response.data['childrenBlocks'].map { |b| b['id'] }.sort).to eq [block2.id, child1.id, child2.id, child3.id, block4.id].sort
    end
  end
end
