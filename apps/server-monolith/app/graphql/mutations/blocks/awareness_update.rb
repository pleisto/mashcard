# frozen_string_literal: true

module Mutations
  module Blocks
    class AwarenessUpdate < ::Mutations::BaseMutation
      graphql_name 'AwarenessUpdate'
      argument :doc_id, Scalars::UUID, 'doc id', required: true
      argument :operator_id, String, 'operator id', required: true
      argument :updates, String, 'updates', required: true

      def resolve(doc_id:, operator_id:, updates:)
        BrickdocSchema.subscriptions.trigger(:awareness, { doc_id: doc_id }, {
          operator_id: operator_id,
          updates: updates,
        })
        nil
      end
    end
  end
end
