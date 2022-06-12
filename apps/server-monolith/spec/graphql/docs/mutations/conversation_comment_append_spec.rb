# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::ConversationCommentAppend, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation conversationCommentAppend($input: ConversationCommentAppendInput!) {
        conversationCommentAppend(input: $input) {
          errors
        }
      }
    TEXT

    let(:user) { create(:accounts_user) }
    let(:block) { create(:docs_block) }

    it 'create' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      comment = Docs::Conversation.create_conversation_comment!(
        creator: user,
        doc: block,
        content: { foo: 'bar' }
      )

      input = { input: {
        conversationId: comment.conversation.id.to_s,
        content: { foo: 'bar' },
      } }

      internal_graphql_execute(mutation, input)
      expect(response.errors).to be {}
      expect(response.success?).to be(true)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
