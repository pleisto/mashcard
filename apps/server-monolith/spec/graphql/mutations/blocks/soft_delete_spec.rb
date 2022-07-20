# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Blocks::SoftDelete, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockSoftDelete($input: BlockSoftDeleteInput!) {
        blockSoftDelete(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'soft delete' do
      self.current_user = user

      root_block = create(:docs_block, pod: user.personal_pod)
      expect(root_block.deleted_at).to be_nil

      input = { input: { id: root_block.id, hardDelete: false } }
      graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockSoftDelete' => nil })

      root_block.reload
      expect(root_block.deleted_at).not_to be_nil
      expect(root_block.deleted_permanently_at).to be_nil

      input = { input: { id: root_block.id, hardDelete: false } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(true)
      # expect(response.errors[0]['message']).to eq(I18n.t("errors.graphql.argument_error.already_soft_delete"))

      self.current_user = nil
    end

    it 'hard delete' do
      self.current_user = user

      root_block = create(:docs_block, pod: user.personal_pod)
      expect(root_block.deleted_at).to be_nil

      input = { input: { id: root_block.id, hardDelete: true } }
      graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockSoftDelete' => nil })

      root_block.reload
      expect(root_block.deleted_at).not_to be_nil
      expect(root_block.deleted_permanently_at).not_to be_nil

      self.current_user = nil
    end
  end
end
