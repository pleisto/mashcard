# frozen_string_literal: true

module Types
  class Conversation < Types::BaseObject
    description 'Brickdoc Docs::Conversation'
    field :block_ids, [Scalars::UUID], 'blockIds', null: false
    field :comments, [Types::Comment], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, 'created at', null: false
    field :doc_id, Scalars::UUID, null: false
    field :id, String, null: false
    field :latest_reply_at, GraphQL::Types::ISO8601DateTime, 'latestReplyAt', null: true
    field :mark_ids, [Scalars::UUID], 'markIds', null: false
    field :status, Types::ConversationStatusType, 'status', null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
  end
end
