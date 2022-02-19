# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::TrashBlocks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetTrashBlocks($domain: String!, $blockId: UUID, $search: String) {
        trashBlocks(domain: $domain, blockId: $blockId, search: $search) {
          id
          sort
          nextSort
          firstChildSort
          rootId
          parentId
          type
          pathArray {
            id
            text
            icon {
              ... on BlockImage {
                type
                source
                key
              }

              ... on BlockEmoji {
                type
                name
                emoji
              }
            }
          }
          text
        }
      }
    GRAPHQL

    it 'global' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      block = create(:docs_block, space: space, collaborators: [user.id], text: "foo bar zzz")
      block.soft_delete!

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      internal_graphql_execute(query, { domain: space.domain, search: "baz" })
      expect(response.success?).to be true
      expect(response.data['trashBlocks']).to eq([])

      internal_graphql_execute(query, { domain: space.domain, search: "bar" })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      self.current_user = nil
      self.current_space = nil
    end

    it 'current page (child page)' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      root = create(:docs_block, space: space, collaborators: [user.id])
      block = create(:docs_block, space: space, parent: root, root_id: root.id)
      block.soft_delete!

      internal_graphql_execute(query, { domain: space.domain, blockId: root.id })

      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      self.current_user = nil
      self.current_space = nil
    end

    it 'current page (sub page)' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      root = create(:docs_block, space: space, collaborators: [user.id])
      block = root.create_sub_block!("abc")
      block.soft_delete!

      internal_graphql_execute(query, { domain: space.domain, blockId: root.id })

      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      self.current_user = nil
      self.current_space = nil
    end

    it 'hard delete dangling' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      root = create(:docs_block, space: space, collaborators: [user.id])
      block = root.create_sub_block!("abc")
      sub_block = block.create_sub_block!("abc")
      sub_sub_block = sub_block.create_sub_block!("abc")
      root.soft_delete!
      block.soft_delete!

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].count).to eq(2)

      block.hard_delete!

      internal_graphql_execute(query, { domain: space.domain })
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

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].count).to eq(0)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
