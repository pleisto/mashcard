# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockCreateSubBlock, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockCreateSubBlock($input: BlockCreateSubBlockInput!) {
        blockCreateSubBlock(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'pod' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      expect(block.descendants.count).to eq(1)

      input = { input: { id: block.id, title: "child block1" } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockCreateSubBlock" => nil })
      expect(block.descendants.count).to eq(1)
      expect(block.descendants_raw.count).to eq(2)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
