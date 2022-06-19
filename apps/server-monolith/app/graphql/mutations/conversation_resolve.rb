# frozen_string_literal: true

module Mutations
  class ConversationResolve < ::Mutations::BaseMutation
    argument :conversation_id, String, 'Conversation id', required: true

    def resolve(conversation_id:)
      conversation = Docs::Conversation.find(conversation_id)
      conversation.resolved!

      nil
    end
  end
end
