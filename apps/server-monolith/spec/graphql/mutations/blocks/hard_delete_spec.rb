# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Blocks::HardDelete, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockHardDelete($input: BlockHardDeleteInput!) {
        blockHardDelete(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'work' do
      self.current_user = user

      root_block = create(:docs_block, pod: user.personal_pod)
      expect(root_block.deleted_at).to be_nil

      input = { input: { ids: [root_block.id] } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(false)
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.not_deleted'))

      root_block.soft_delete!

      input = { input: { ids: [root_block.id] } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(true)
      expect(response.data).to eq({ 'blockHardDelete' => nil })

      root_block.reload
      expect(root_block.deleted_permanently_at).not_to be_nil

      input = { input: { ids: [root_block.id] } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(false)
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.already_hard_delete'))

      self.current_user = nil
    end
  end
end
