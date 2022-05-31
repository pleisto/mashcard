# frozen_string_literal: true

module Docs
  module Objects
    class Comment < BrickGraphQL::BaseObject
      description 'Brickdoc Docs::Comment'
      field :id, String, null: false
      field :content, GraphQL::Types::JSON, 'content', null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, 'updated at', null: false
      field :created_at, GraphQL::Types::ISO8601DateTime, 'created at', null: false
      field :status, Enums::CommentStatusType, 'status', null: false
      field :creator, System::Objects::ThinUser, 'creator', null: false
    end
  end
end
