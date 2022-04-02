# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockSyncBatch, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockSyncBatch($input: BlockSyncBatchInput!) {
        blockSyncBatch(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:operator_id) { SecureRandom.uuid }

    it 'empty' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      root_id = SecureRandom.uuid

      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: [{
        id: root_id,
        type: "doc",
        meta: {},
        data: {},
        text: "",
        content: [],
        sort: 147
      }] } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => nil })
      root = Docs::Block.non_deleted.find(root_id)
      expect(root.type).to eq("doc")
      expect(root.sort).to eq(147)
      expect(root.descendants.count).to eq(1)

      self.current_user = nil
      self.current_space = nil
    end

    it 'last domain and last block_id' do
      user = create(:accounts_user)
      self.current_user = user
      space = user.personal_space
      self.current_space = space.as_session_context

      expect(user.last_space_domain).to eq(nil)
      expect(user.last_block_ids).to eq({})

      root_id = SecureRandom.uuid
      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: [{
        id: root_id,
        type: "doc",
        meta: {},
        data: {},
        text: "",
        content: [],
        sort: 147
      }] } }
      internal_graphql_execute(mutation, input)

      user.reload

      expect(user.last_space_domain).to eq(user.domain)
      expect(user.last_block_ids).to eq({ user.domain => root_id })
    end

    it 'works' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      root_id = SecureRandom.uuid

      blocks = [{
        id: SecureRandom.uuid,
        type: "doc",
        parentId: root_id,
        meta: {},
        data: {},
        text: "",
        content: [],
        sort: 321
      }, {
        id: root_id,
        type: "doc",
        meta: {},
        data: {},
        text: "",
        content: [],
        sort: 159
      }]

      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: blocks } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => nil })
      root = Docs::Block.find(root_id)
      expect(root.descendants.count).to eq(2)
      expect(root.sort).to eq(159)

      blocks = blocks.map { |b| b.merge(sort: 333) }
      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: blocks } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => nil })
      root.reload
      expect(root.descendants.count).to eq(2)
      expect(root.sort).to eq(333)

      blocks = blocks.map { |b| b[:id] == root_id ? b : b.merge(sort: 444) }
      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: blocks } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => nil })

      self.current_user = nil
      self.current_space = nil
    end

    it 'deleteIds' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      root_id = SecureRandom.uuid
      block_id = SecureRandom.uuid

      blocks = [{
        id: block_id,
        type: "doc",
        parentId: root_id,
        meta: {},
        data: {},
        text: "",
        content: [],
        sort: 321
      }, {
        id: root_id,
        type: "doc",
        meta: {},
        data: {},
        text: "",
        content: [],
        sort: 159
      }]

      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: blocks } }
      internal_graphql_execute(mutation, input)
      root = Docs::Block.find(root_id)

      expect(root.descendants.count).to eq(2)
      expect(Docs::Block.find(block_id).deleted_at).to eq(nil)

      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [block_id], blocks: [] } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => nil })

      expect(root.descendants.count).to eq(1)
      expect(Docs::Block.find(block_id).deleted_at).not_to eq(nil)
    end

    it 'edit deleted blocks' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      block = create(:docs_block, space: user.personal_space)
      root_id = block.id

      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: [{
        id: root_id,
        type: "doc",
        meta: {},
        data: {},
        text: "123",
        content: [],
        sort: 147
      }] } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => nil })

      block.soft_delete!

      input = { input: { operatorId: operator_id, rootId: root_id, deletedIds: [], blocks: [{
        id: root_id,
        type: "doc",
        meta: {},
        data: {},
        text: "123456",
        content: [],
        sort: 147
      }] } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be(true)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
