# frozen_string_literal: true

module Docs
  module Objects
    class Conversation < BrickGraphQL::BaseObject
      description 'Brickdoc Docs::Conversation'
      field :id, String, null: false
      field :doc_id, BrickGraphQL::Scalars::UUID, null: false
      field :block_ids, [BrickGraphQL::Scalars::UUID], 'blockIds', null: false
      field :mark_ids, [BrickGraphQL::Scalars::UUID], 'markIds', null: false
      field :latest_reply_at, GraphQL::Types::ISO8601DateTime, 'latestReplyAt', null: true
      field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
      field :created_at, GraphQL::Types::ISO8601DateTime, 'created at', null: false
      field :status, Enums::ConversationStatusType, 'status', null: false
      field :comments, [Docs::Objects::Comment], null: false
    end
  end
end
