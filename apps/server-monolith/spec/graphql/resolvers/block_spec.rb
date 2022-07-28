# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Block, type: :query do
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
      query GetPageBlocks($domain: String!) {
        pageBlocks(domain: $domain) {
          id
          sort
          nextSort
          firstChildSort
          parentId
          documentInfo {
            id
            title
            icon {
              ... on BlockImage {
                type
                source
                key
                height
                width
              }

              ... on BlockEmoji {
                type
                name
                emoji
              }
            }
            pin
          }
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
      child1 = create(:docs_block, pod: pod, sort: 100, collaborators: [user.id], parent: block2,
        root_id: block2.id)
      child2 = create(:docs_block, pod: pod, sort: 200, collaborators: [user.id], parent: block2,
        root_id: block2.id)
      child3 = create(:docs_block, pod: pod, sort: 300, collaborators: [user.id], parent: block2,
        root_id: block2.id)

      expect do
        graphql_execute(get_block_query, { id: block1.id })
      end.to raise_error('Not Authorized')

      graphql_execute(get_block_query, { id: block2.id })
      expect(response.success?).to be true
      expect(response.data['block']['id']).to eq block2.id
      expect(response.data['block']['permissions']['canShow']['value']).to be true

      # pageBlocks

      graphql_execute(page_block_query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].length).to eq 4
      root = response.data['pageBlocks'].find { |b| b.fetch('parentId').nil? }
      expect(root['id']).to eq block2.id
      expect(root['nextSort'].class).to eq String
      expect(root['nextSort'].to_i).not_to eq 0
      expect(root['firstChildSort'].to_i).to eq child1.reload.sort
      sort_map = {
        # block2.id => [Docs::Block::SORT_GAP, Docs::Block::SORT_GAP * 2],
        child1.id => [0, Docs::Block::SORT_GAP * 1],
        child2.id => [Docs::Block::SORT_GAP * 1, Docs::Block::SORT_GAP * 2],
        child3.id => [Docs::Block::SORT_GAP * 2, Docs::Block::SORT_GAP * 3],
      }
      expect(response.data['pageBlocks'].each_with_object({}) do |x, h|
        h[x['id']] = [x['sort'].to_i, x['nextSort'].to_i] if x['id'] != block2.id
      end).to eq(sort_map)
      expect(child2.reload.sort).to eq(Docs::Block::SORT_GAP)
    end
  end
end
