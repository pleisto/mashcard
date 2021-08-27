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
      expect(response.data).to eq({ "blockSyncBatch" => nil })
      root = Docs::Block.find(root_id)
      expect(root.type).to eq("doc")
      expect(root.sort).to eq(147)
      expect(root.descendants.count).to eq(1)

      self.current_user = nil
      self.current_pod = nil
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
      expect(response.data).to eq({ "blockSyncBatch" => nil })
      root = Docs::Block.find(root_id)
      expect(root.descendants.count).to eq(2)
      expect(root.sort).to eq(159)

      blocks = blocks.map { |b| b.merge(sort: 333) }
      input = { input: { operatorId: operator_id, rootId: root_id, blocks: blocks } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSyncBatch" => nil })
      root.reload
      expect(root.descendants.count).to eq(2)
      expect(root.sort).to eq(333)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
