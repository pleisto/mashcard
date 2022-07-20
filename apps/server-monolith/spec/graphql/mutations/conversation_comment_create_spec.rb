# frozen_string_literal: true

require 'rails_helper'

describe Mutations::ConversationCommentCreate, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation conversationCommentCreate($input: ConversationCommentCreateInput!) {
        conversationCommentCreate(input: $input) {
          errors
        }
      }
    TEXT

    let(:user) { create(:accounts_user) }
    let(:block) { create(:docs_block) }

    it 'create' do
      self.current_user = user

      input = { input: {
        docId: block.id,
        content: { foo: 'bar' },
      } }

      graphql_execute(mutation, input)
      expect(response.errors).to be {}
      expect(response.success?).to be(true)

      self.current_user = nil
    end
  end
end
