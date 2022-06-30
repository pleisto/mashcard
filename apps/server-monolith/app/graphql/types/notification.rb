# frozen_string_literal: true

module Types
  class Notification < Types::BaseObject
    graphql_name 'Notification'
    description 'MashCard Notification'
    field :created_at, GraphQL::Types::ISO8601DateTime, 'created at', null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
    field :notification_type, String, 'notification type', null: false
    field :status, String, 'status', null: false
    field :type, String, 'Source type', null: false
    field :data, GraphQL::Types::JSON, 'data', null: false
    field :conversation, Types::Conversation, 'Conversation', null: true
    field :comment, Types::Comment, 'Comment', null: true
  end
end
