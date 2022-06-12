# frozen_string_literal: true

module Docs
  module Mutations
    class ConversationCommentAppend < BrickGraphQL::BaseMutation
      argument :content, GraphQL::Types::JSON, required: true
      argument :conversation_id, String, 'Conversation id', required: true

      def resolve(conversation_id:, content:)
        conversation = Docs::Conversation.find(conversation_id)
        conversation.append_comment!(
          creator: current_user,
          content: content,
        )

        nil
      end
    end
  end
end
