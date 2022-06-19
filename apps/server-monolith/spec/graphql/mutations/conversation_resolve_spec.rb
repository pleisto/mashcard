# frozen_string_literal: true

require 'rails_helper'

describe Mutations::ConversationResolve, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation conversationResolve($input: ConversationResolveInput!) {
        conversationResolve(input: $input) {
          errors
        }
      }
    TEXT

    let(:user) { create(:accounts_user) }
    let(:block) { create(:docs_block) }

    it 'resolve' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

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
      self.current_pod = nil
    end
  end
end
