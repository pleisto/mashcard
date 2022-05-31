# frozen_string_literal: true

module Docs
  module Enums
    class ConversationStatusType < BrickGraphQL::BaseEnum
      value 'opened', 'OPENED'
      value 'resolved', 'RESOLVED'
      value 'deleted', 'DELETED'
    end
  end
end
