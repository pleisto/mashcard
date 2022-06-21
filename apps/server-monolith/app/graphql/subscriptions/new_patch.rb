# frozen_string_literal: true

module Subscriptions
  class NewPatch < BaseSubscription
    argument :doc_id, Scalars::UUID, required: true
    field :patches, [Types::PatchBaseObject], null: false
    field :seq, Int, null: false
    field :state, Types::Patchstate, null: false

    # https://graphql-ruby.org/subscriptions/triggers.html
    # https://graphql-ruby.org/subscriptions/subscription_classes
    # https://graphql-ruby.org/subscriptions/broadcast.html
    def subscribe(doc_id:)
      Rails.logger.info("Subscriptions subscribe #{doc_id}")
      block = Docs::Block.non_deleted.find_by(id: doc_id)

      if block.nil?
        raise Mashcard::GraphQL::Errors::BaseError, I18n.t('errors.graphql.docs.initialized_not_yet_completed')
      end

      block.prepare_descendants
      { state: 'SUBSCRIBED', patches: [], seq: block.patch_seq_increment }
    end

    def update(doc_id:)
      Rails.logger.info("Subscriptions update #{doc_id}, #{object}")
      result = object

      case result.fetch(:state)
      when 'DELETED'
        unsubscribe
      when 'SKIP'
        :no_update
      else
        result
      end
    end

    # def authorized?(room:)
    #   context[:viewer].can_read_messages?(room)
    # end
  end
end
