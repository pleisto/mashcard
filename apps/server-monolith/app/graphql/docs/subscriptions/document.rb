# frozen_string_literal: true

module Docs
  module Subscriptions
    class Document < BrickGraphQL::BaseSubscription
      argument :doc_id, BrickGraphQL::Scalars::UUID, required: true
      field :blocks, [Docs::Objects::BlockNew], null: true
      field :histories, [Docs::Objects::DocumentHistory], null: true
      field :operator_id, BrickGraphQL::Scalars::UUID
      field :states, [Docs::Objects::BlockState], null: true
      field :users, [System::Objects::ThinUser], null: true
      # https://graphql-ruby.org/subscriptions/triggers.html
      # https://graphql-ruby.org/subscriptions/subscription_classes
      # https://graphql-ruby.org/subscriptions/broadcast.html
      def subscribe(doc_id:)
        Rails.logger.info("Document New subscribe #{doc_id}")
        {}
      end

      def update(doc_id:)
        Rails.logger.info("Document New update #{doc_id}, #{object}")
        object
      end
    end
  end
end
