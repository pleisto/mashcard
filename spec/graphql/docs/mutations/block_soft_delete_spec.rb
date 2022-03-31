# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockSoftDelete, type: :mutation do
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
      self.current_space = user.personal_space.as_session_context

      root_block = create(:docs_block, space: user.personal_space)
      expect(root_block.deleted_at).to eq(nil)

      input = { input: { id: root_block.id, hardDelete: false } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSoftDelete" => nil })

      root_block.reload
      expect(root_block.deleted_at).to_not eq(nil)
      expect(root_block.deleted_permanently_at).to eq(nil)

      input = { input: { id: root_block.id, hardDelete: false } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to eq(true)
      # expect(response.errors[0]['message']).to eq(I18n.t("errors.graphql.argument_error.already_soft_delete"))

      self.current_user = nil
      self.current_space = nil
    end

    it 'hard delete' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      root_block = create(:docs_block, space: user.personal_space)
      expect(root_block.deleted_at).to eq(nil)

      input = { input: { id: root_block.id, hardDelete: true } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ "blockSoftDelete" => nil })

      root_block.reload
      expect(root_block.deleted_at).to_not eq(nil)
      expect(root_block.deleted_permanently_at).to_not eq(nil)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
