# frozen_string_literal: true

module Mutations
  class ConversationDelete < ::Mutations::BaseMutation
    argument :conversation_id, String, 'Conversation id', required: true

    def resolve(conversation_id:)
      conversation = Docs::Conversation.find(conversation_id)
      conversation.deleted!

      nil
    end
  end
end
