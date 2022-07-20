# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::TrashBlocks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetTrashBlocks($domain: String!, $blockId: UUID, $search: String) {
        trashBlocks(domain: $domain, blockId: $blockId, search: $search) {
          id
          documentInfo {
            id
            title
            deletedAt
            restorable
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
            pathArray {
              id
              title
              isDeleted
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
            }
          }
        }
      }
    GRAPHQL

    it 'global' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)

      block = create(:docs_block, pod: pod, collaborators: [user.id], text: 'foo bar zzz')
      block.soft_delete!

      graphql_execute(query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to be(true)

      graphql_execute(query, { domain: pod.domain, search: 'baz' })
      expect(response.success?).to be true
      expect(response.data['trashBlocks']).to eq([])

      graphql_execute(query, { domain: pod.domain, search: 'bar' })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to be(true)

      self.current_user = nil
    end

    it 'current page (child page)' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)

      root = create(:docs_block, pod: pod, collaborators: [user.id])
      block = create(:docs_block, pod: pod, parent: root, root_id: root.id)
      block.soft_delete!

      graphql_execute(query, { domain: pod.domain, blockId: root.id })

      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to be(true)

      self.current_user = nil
    end

    it 'current page (sub page)' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)

      root = create(:docs_block, pod: pod, collaborators: [user.id])
      block = root.create_sub_block!('abc')
      block.soft_delete!

      graphql_execute(query, { domain: pod.domain, blockId: root.id })

      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to be(true)

      self.current_user = nil
    end

    it 'hard delete dangling' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)

      root = create(:docs_block, pod: pod, collaborators: [user.id])
      block = root.create_sub_block!('abc')
      sub_block = block.create_sub_block!('abc')
      sub_sub_block = sub_block.create_sub_block!('abc')
      root.soft_delete!
      block.soft_delete!

      graphql_execute(query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].count).to eq(2)

      block.hard_delete!

      graphql_execute(query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].count).to eq(1)

      block.update_columns(deleted_permanently_at: nil)
      sub_block.update_columns(deleted_permanently_at: nil)
      sub_sub_block.update_columns(deleted_permanently_at: nil)

      block.reload
      sub_block.reload
      sub_sub_block.reload

      block.restore!
      sub_block.soft_delete!
      root.hard_delete!

      graphql_execute(query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].count).to eq(0)

      self.current_user = nil
    end
  end
end
