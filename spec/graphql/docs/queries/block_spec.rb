# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::Block, type: :query do
  describe '#resolver' do
    it 'check permission' do
      user = create(:accounts_user)
      self.current_user = user

      pod = create(:pod)

      block1 = create(:docs_block, pod: pod)
      block2 = create(:docs_block, pod: pod, collaborators: [user.id])

      # block
      query = <<-'GRAPHQL'
        query GetBlock($id: String!) {
          block(id: $id) {
            ... on PageBlock {
              id
              permissions {
                canShow {
                  value
                }
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
            ... on PageBlock {
              id
              sort
              parentId
              type
              data {
                title
              }
              meta {
                icon
                cover
              }
            }

            ... on ParagraphBlock {
              id
              sort
              parentId
              type
              data {
                text
                content
              }
              meta {
                attrs
              }
            }
          }
        }
      GRAPHQL

      internal_graphql_execute(query, { webid: pod.webid })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].length).to eq 1
      expect(response.data['pageBlocks'].first['id']).to eq block2.id

      # childrenBlocks
      _block3 = create(:docs_block, parent: block2)
      block4 = create(:docs_block, parent: block2, collaborators: [user.id])

      query = <<-'GRAPHQL'
        query GetChildrenBlocks($parent_id: String!, $snapshot_version: Int!) {
          childrenBlocks(parentId: $parent_id, snapshotVersion: $snapshot_version) {
            ... on PageBlock {
              id
            }
          }
        }
      GRAPHQL

      internal_graphql_execute(query, { parent_id: block2.id, snapshot_version: 0 })

      expect(response.success?).to be true
      expect(response.data['childrenBlocks'].length).to eq 2
      expect(response.data['childrenBlocks'].map { |b| b['id'] }.sort).to eq [block2.id, block4.id].sort
    end
  end
end
