# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Blocks::Create, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockCreate($input: BlockCreateInput!) {
        blockCreate(input: $input) {
          id
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'sub block' do
      self.current_user = user

      expect(block.descendants.count).to eq(1)

      input = { input: { parentId: block.id, title: 'child block1', username: user.username } }
      graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data['blockCreate']['id']).not_to be_nil
      expect(block.descendants.count).to eq(1)
      expect(block.descendants_raw.count).to eq(2)
      expect(block.descendants_raw.find { |b| b.id != block.id }.sort).to eq(Docs::Block::SORT_GAP)

      self.current_user = nil
    end

    it 'root block' do
      self.current_user = user

      input = { input: { title: 'child block1', username: user.username } }
      graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data['blockCreate']['id']).not_to be_nil

      self.current_user = nil
    end
  end
end
