# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockUpdate, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockUpdate($input: BlockUpdateInput!) {
        blockUpdate(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'insert & update databaseRow' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      root_block = create(:docs_block, pod: user.personal_pod)
      table_block = create(:docs_block, pod: user.personal_pod, type: 'tableBlock', parent: root_block, root_id: root_block.id)

      block_input = {
        id: SecureRandom.uuid,
        type: 'databaseRow',
        parentId: table_block.id,
        content: [],
        text: '',
        sort: 0,
        data: {}
      }
      input = { input: { rootId: table_block.id, block: block_input } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockUpdate" => nil })

      row_block = Docs::Block.find(block_input[:id])

      expect(row_block.parent).to eq(table_block)
      expect(row_block.root_id).to eq(table_block.id)

      input = { input: { rootId: table_block.id, block: block_input.merge(data: { 'a' => 'test' }) } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockUpdate" => nil })

      row_block.reload
      expect(row_block.data['a']).to eq('test')

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
