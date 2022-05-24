# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockRename, type: :mutation do
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
      self.current_space = user.personal_space.as_session_context

      block = create(:docs_block, space: user.personal_space)
      title = 'new title'

      input = { input: { id: block.id, title: title } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockRename' => nil })

      block.reload
      expect(block.title).to eq(title)
      expect(block.meta['title']).to eq(title)

      input = { input: { id: block.id, title: '' } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be(false)
      expect(response.errors[0]['message']).to eq(I18n.t('errors.graphql.argument_error.empty_title'))

      self.current_user = nil
      self.current_space = nil
    end
  end
end
