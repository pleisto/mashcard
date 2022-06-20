# frozen_string_literal: true

module Mutations
  class ConversationCommentAppend < ::Mutations::BaseMutation
    argument :content, GraphQL::Types::JSON, required: true
    argument :conversation_id, String, 'Conversation id', required: true

    field :comment, Types::Comment, null: false

    def resolve(conversation_id:, content:)
      conversation = Docs::Conversation.find(conversation_id)
      result = conversation.append_comment!(
        creator: current_user,
        content: content,
      )

      {
        comment: result,
      }
    end
  end
end
