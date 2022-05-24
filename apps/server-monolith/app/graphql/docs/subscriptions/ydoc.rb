# frozen_string_literal: true

module Docs
  module Subscriptions
    class Ydoc < BrickGraphQL::BaseSubscription
      argument :doc_id, BrickGraphQL::Scalars::UUID, required: true
      field :operator_id, BrickGraphQL::Scalars::UUID
      field :state_id, BrickGraphQL::Scalars::UUID
      field :updates, String, null: false
      # https://graphql-ruby.org/subscriptions/triggers.html
      # https://graphql-ruby.org/subscriptions/subscription_classes
      # https://graphql-ruby.org/subscriptions/broadcast.html
      def subscribe(doc_id:)
        Rails.logger.info("Ydoc subscribe #{doc_id}")
        # block = Docs::Block.non_deleted.find_by(id: doc_id)
        # TODO: server-side ydoc persistence
        { updates: [] }
      end

      def update(doc_id:)
        Rails.logger.info("Ydoc update #{doc_id}, #{object}")
        object
      end

      # def authorized?(room:)
      #   context[:viewer].can_read_messages?(room)
      # end
    end
  end
end
