# frozen_string_literal: true

module Mutations
  class ConversationCommentCreate < ::Mutations::BaseMutation
    argument :block_ids, [Scalars::UUID], required: false
    argument :content, GraphQL::Types::JSON, required: true
    argument :doc_id, Scalars::UUID, 'comment doc id', required: true
    argument :mark_ids, [Scalars::UUID], required: false

    field :conversation, Types::Conversation, null: false

    def resolve(args)
      doc = Docs::Block.find(args[:doc_id])
      result = Docs::Conversation.create_conversation_comment!(
        creator: current_user,
        doc: doc,
        content: args[:content],
        block_ids: args[:block_ids],
        mark_ids: args[:mark_ids]
      )

      {
        conversation: result,
      }
    end
  end
end
