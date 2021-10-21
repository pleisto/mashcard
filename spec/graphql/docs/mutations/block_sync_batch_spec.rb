# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockSyncBatch, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockSyncBatch($input: BlockSyncBatchInput!) {
        blockSyncBatch(input: $input) {
          errors
          refetchTree
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:operator_id) { SecureRandom.uuid }

    it 'empty' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      root_id = SecureRandom.uuid

      input = { input: { operatorId: operator_id, rootId: root_id, blocks: [{
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
      expect(response.data).to eq({ "blockSyncBatch" => { "errors" => [], "refetchTree" => true } })
      root = Docs::Block.non_deleted.find(root_id)
      expect(root.type).to eq("doc")
      expect(root.sort).to eq(147)
      expect(root.descendants.count).to eq(1)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'last webid and last block_id' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context

      expect(user.last_webid).to eq(nil)
      expect(user.last_block_id).to eq(nil)

      root_id = SecureRandom.uuid
      input = { input: { operatorId: operator_id, rootId: root_id, blocks: [{
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

      expect(user.last_webid).to eq(user.webid)
      expect(user.last_block_id).to eq(root_id)
    end

    it 'works' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

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

      input = { input: { operatorId: operator_id, rootId: root_id, blocks: blocks } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => { "errors" => [], "refetchTree" => true } })
      root = Docs::Block.find(root_id)
      expect(root.descendants.count).to eq(2)
      expect(root.sort).to eq(159)

      blocks = blocks.map { |b| b.merge(sort: 333) }
      input = { input: { operatorId: operator_id, rootId: root_id, blocks: blocks } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => { "errors" => [], "refetchTree" => true } })
      root.reload
      expect(root.descendants.count).to eq(2)
      expect(root.sort).to eq(333)

      blocks = blocks.map { |b| b[:id] == root_id ? b : b.merge(sort: 444) }
      input = { input: { operatorId: operator_id, rootId: root_id, blocks: blocks } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => { "errors" => [], "refetchTree" => false } })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'edit deleted blocks' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      block = create(:docs_block, pod: user.personal_pod)
      root_id = block.id

      input = { input: { operatorId: operator_id, rootId: root_id, blocks: [{
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
      expect(response.data).to eq({ "blockSyncBatch" => { "errors" => [], "refetchTree" => true } })

      block.soft_delete!

      input = { input: { operatorId: operator_id, rootId: root_id, blocks: [{
        id: root_id,
        type: "doc",
        meta: {},
        data: {},
        text: "123456",
        content: [],
        sort: 147
      }] } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be(false)
      expect(response.errors[0]['message']).to eq(I18n.t("errors.graphql.argument_error.cannot_modify_deleted_blocks"))

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
