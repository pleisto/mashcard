# frozen_string_literal: true

module Docs
  module Objects
    class DocumentHistory < BrickGraphQL::BaseObject
      graphql_name 'documentHistory'

      has_primary_key uuid: true
      field :created_at, GraphQL::Types::ISO8601DateTime, 'Created at', null: false
      field :username, String, 'Username', null: false

      def username
        object.user.name
      end
    end
  end
end
