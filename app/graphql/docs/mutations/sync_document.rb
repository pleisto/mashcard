# frozen_string_literal: true
module Docs
  class Mutations::SyncDocument < BrickGraphQL::BaseMutation
    argument :doc_id, BrickGraphQL::Scalars::UUID, 'doc id', required: true
    argument :operator_id, String, 'operator id', required: true
    argument :state, String, 'full state', required: true
    argument :state_id, BrickGraphQL::Scalars::UUID, 'state id', required: true
    argument :previous_state_id, BrickGraphQL::Scalars::UUID, 'previous state id', required: false
    argument :updates, String, 'updates', required: false

    field :document, Docs::Objects::Document, null: true

    def resolve(doc_id:, operator_id:, state:, state_id:, previous_state_id: nil, updates: nil)
      Rails.logger.info("committing #{doc_id} by #{operator_id}, #{state_id} -> #{previous_state_id} : #{state} #{updates}")
      document = Docs::Document.where(id: doc_id).first_or_initialize

      Rails.logger.info("pub #{doc_id} by #{operator_id} #{updates}")

      if document.state_id.blank? || (document.state_id == previous_state_id)
        document.state = Base64.strict_decode64(state)
        # document.state = state
        document.state_id = state_id
        document.save
        BrickdocSchema.subscriptions.trigger(:ydoc, { doc_id: doc_id }, {
          operator_id: operator_id,
          updates: updates,
          state_id: state_id
        })
        {
          document: {
            id: doc_id,
            state_id: state_id
          }
        }
      else
        {
          document: document
        }
      end

      # # # TODO: server-side ydoc persistence
      # # BrickdocSchema.subscriptions.trigger(:ydoc, { doc_id: doc_id }, {
      # #   operator_id: operator_id,
      # #   updates: updates
      # # })
      # nil
    end
  end
end
