# frozen_string_literal: true

module Docs
  module Enums
    class CommentStatusType < BrickGraphQL::BaseEnum
      value 'normal', 'NORMAL'
      value 'deleted', 'DELETED'
    end
  end
end
