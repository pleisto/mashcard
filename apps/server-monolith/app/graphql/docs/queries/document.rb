# typed: true
# frozen_string_literal: true

module Docs
  module Queries
    class Document < BrickGraphQL::BaseResolver
      type Docs::Objects::Document, null: true

      argument :doc_id, GraphQL::Types::String, required: true,
        description: 'document id'

      def resolve(doc_id:)
        Docs::Document.find_by(id: doc_id)
      end
    end
  end
end
