# frozen_string_literal: true

module Docs
  module Subscriptions
    class Awareness < BrickGraphQL::BaseSubscription
      argument :doc_id, BrickGraphQL::Scalars::UUID, required: true
      field :operator_id, BrickGraphQL::Scalars::UUID
      field :updates, String, null: false

      def subscribe(doc_id:)
        Rails.logger.info("Document Awareness subscribe #{doc_id}")
        { updates: [] }
      end

      def update(doc_id:)
        Rails.logger.info("Document Awareness broadcast #{doc_id}, #{object}")
        object
      end

      # def authorized?(doc_id:)
      # end
    end
  end
end
