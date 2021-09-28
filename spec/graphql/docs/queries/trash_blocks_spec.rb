# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::TrashBlocks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetTrashBlocks($webid: String!, $blockId: UUID, $search: String) {
        trashBlocks(webid: $webid, blockId: $blockId, search: $search) {
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
          }
          text
        }
      }
    GRAPHQL

    it 'global' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)
      self.current_pod = pod.as_session_context

      block = create(:docs_block, pod: pod, collaborators: [user.id], text: "foo bar zzz")
      block.soft_delete!

      internal_graphql_execute(query, { webid: pod.webid })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      internal_graphql_execute(query, { webid: pod.webid, search: "baz" })
      expect(response.success?).to be true
      expect(response.data['trashBlocks']).to eq([])

      internal_graphql_execute(query, { webid: pod.webid, search: "bar" })
      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'current page (child page)' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)
      self.current_pod = pod.as_session_context

      root = create(:docs_block, pod: pod, collaborators: [user.id])
      block = create(:docs_block, pod: pod, parent: root, root_id: root.id)
      block.soft_delete!

      internal_graphql_execute(query, { webid: pod.webid, blockId: root.id })

      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'current page (sub page)' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)
      self.current_pod = pod.as_session_context

      root = create(:docs_block, pod: pod, collaborators: [user.id])
      block = root.create_sub_block!("abc")
      block.soft_delete!

      internal_graphql_execute(query, { webid: pod.webid, blockId: root.id })

      expect(response.success?).to be true
      expect(response.data['trashBlocks'].any? { |b| b['id'] == block.id }).to eq(true)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
