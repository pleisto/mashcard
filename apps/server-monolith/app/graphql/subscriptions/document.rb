# frozen_string_literal: true

module Subscriptions
  class Document < BaseSubscription
    argument :doc_id, Scalars::UUID, required: true
    field :blocks, [Types::Blocks::New], null: true
    field :histories, [Types::DocumentHistory], null: true
    field :operator_id, Scalars::UUID
    field :states, [Types::Blocks::State], null: true
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
