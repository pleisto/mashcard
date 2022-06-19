# frozen_string_literal: true

module Types
  class ConversationStatusType < BaseEnum
    value 'opened', 'OPENED'
    value 'resolved', 'RESOLVED'
    value 'deleted', 'DELETED'
  end
end
