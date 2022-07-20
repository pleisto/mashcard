# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Blocks::Rename, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockRename($input: BlockRenameInput!) {
        blockRename(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'work' do
      self.current_user = user

      block = create(:docs_block, pod: user.personal_pod)
      title = 'new title'

      input = { input: { id: block.id, title: title } }
      graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockRename' => nil })

      block.reload
      expect(block.title).to eq(title)
      expect(block.meta['title']).to eq(title)

      input = { input: { id: block.id, title: '' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(false)
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.empty_title'))

      self.current_user = nil
    end
  end
end
