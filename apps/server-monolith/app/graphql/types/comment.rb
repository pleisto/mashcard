# frozen_string_literal: true

module Types
  class Comment < Types::BaseObject
    description 'Brickdoc Docs::Comment'
    field :content, GraphQL::Types::JSON, 'content', null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, 'created at', null: false
    field :creator, Types::Users::Thin, 'creator', null: false
    field :id, String, null: false
    field :status, Types::CommentStatusType, 'status', null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
  end
end
