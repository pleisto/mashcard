# frozen_string_literal: true

require 'rails_helper'

describe Mutations::ConversationOpen, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation conversationOpen($input: ConversationOpenInput!) {
        conversationOpen(input: $input) {
          errors
        }
      }
    TEXT

    let(:user) { create(:accounts_user) }
    let(:block) { create(:docs_block) }

    it 'open' do
      self.current_user = user

      conversation = Docs::Conversation.create!(
        doc_id: block.id,
        creator_id: user.id,
        collaborators: [user.id],
        block_ids: [],
        mark_ids: []
      )

      input = { input: {
        conversationId: conversation.id.to_s,
      } }

      graphql_execute(mutation, input)

      expect(response.errors).to be {}
      expect(response.success?).to be(true)

      self.current_user = nil
    end
  end
end
