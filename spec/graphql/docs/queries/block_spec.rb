# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::Block, type: :query do
  describe '#resolver' do
    get_block_query = <<-'GRAPHQL'
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

    page_block_query = <<-'GRAPHQL'
      query GetPageBlocks($webid: String!) {
        pageBlocks(webid: $webid) {
          id
          sort
          rootId
          parentId
          nextSort
          firstChildSort
          type
          data {
            text
            content
          }
          meta {
            cover {
              ... on BlockImage {
                type
                key
                source
              }
              ... on BlockColor {
                type
                color
              }
            }
            icon {
              ... on BlockImage {
                type
                key
                source
              }

              ... on BlockEmoji {
                type
                name
                emoji
              }
            }
          }
        }
      }
    GRAPHQL

    children_blocks_query = <<-'GRAPHQL'
      query GetChildrenBlocks($root_id: String!, $snapshot_version: Int!) {
        childrenBlocks(rootId: $root_id, snapshotVersion: $snapshot_version) {
          id
          rootId
        }
      }
    GRAPHQL

    it 'check permission' do
      user = create(:accounts_user)
      self.current_user = user

      pod = create(:pod)

      self.current_pod = pod.as_session_context

      block1 = create(:docs_block, pod: pod)
      block2 = create(:docs_block, pod: pod, collaborators: [user.id])
      child1 = create(:docs_block, pod: pod, sort: 100, collaborators: [user.id], parent: block2, root_id: block2.id)
      child2 = create(:docs_block, pod: pod, sort: 200, collaborators: [user.id], parent: block2, root_id: block2.id)
      child3 = create(:docs_block, pod: pod, sort: 300, collaborators: [user.id], parent: block2, root_id: block2.id)

      expect do
        internal_graphql_execute(get_block_query, { id: block1.id })
      end.to raise_error('Not Authorized')

      internal_graphql_execute(get_block_query, { id: block2.id })
      expect(response.success?).to be true
      expect(response.data['block']['id']).to eq block2.id
      expect(response.data['block']['permissions']['canShow']['value']).to eq true

      # pageBlocks

      internal_graphql_execute(page_block_query, { webid: pod.webid })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].length).to eq 4
      root = response.data['pageBlocks'].find { |b| b.fetch('parentId').nil? }
      expect(root['id']).to eq block2.id
      expect(root['rootId']).to eq block2.id
      expect(root['nextSort'].class).to eq String
      expect(root['nextSort'].to_i).to_not eq 0
      expect(root['firstChildSort'].to_i).to eq child1.reload.sort
      sort_map = {
        # block2.id => [Docs::Block::SORT_GAP, Docs::Block::SORT_GAP * 2],
        child1.id => [0, Docs::Block::SORT_GAP * 1],
        child2.id => [Docs::Block::SORT_GAP * 1, Docs::Block::SORT_GAP * 2],
        child3.id => [Docs::Block::SORT_GAP * 2, Docs::Block::SORT_GAP * 3]
      }
      expect(response.data['pageBlocks'].each_with_object({}) do |x, h|
        h[x['id']] = [x['sort'].to_i, x['nextSort'].to_i] if x['id'] != block2.id
      end).to eq(sort_map)
      expect(child2.reload.sort).to eq(Docs::Block::SORT_GAP)

      # childrenBlocks
      block3 = create(:docs_block, parent: block2, root_id: block2.id)
      block4 = create(:docs_block, parent: block2, collaborators: [user.id], root_id: block2.id)

      internal_graphql_execute(children_blocks_query, { root_id: block2.id, snapshot_version: 0 })

      expect(response.success?).to be true
      expect(response.data['childrenBlocks'].length).to eq 6
      expect(response.data['childrenBlocks'].map do |b|
               b['id']
             end .sort).to eq [block2.id, child1.id, child2.id, child3.id, block3.id, block4.id].sort
    end

    it 'snapshots' do
      user = create(:accounts_user)
      self.current_user = user

      pod = create(:pod)

      self.current_pod = pod.as_session_context

      block = create(:docs_block, pod: pod, collaborators: [user.id])
      _child1 = create(:docs_block, pod: pod, sort: 100, collaborators: [user.id], parent: block, root_id: block.id)
      _child2 = create(:docs_block, pod: pod, sort: 100, collaborators: [user.id], parent: block, root_id: block.id)

      expect do
        internal_graphql_execute(children_blocks_query, { root_id: block.id, snapshot_version: 1 })
      end.to raise_error(ActiveRecord::RecordNotFound)

      block.save_snapshot!

      internal_graphql_execute(children_blocks_query, { root_id: block.id, snapshot_version: 1 })

      expect(response.success?).to be true
      expect(response.data['childrenBlocks'].length).to eq 3

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
