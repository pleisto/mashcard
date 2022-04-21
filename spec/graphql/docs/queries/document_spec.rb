# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::SpreadsheetChildren, type: :query do
  describe '#resolver' do
    it 'can query no document' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context
      # document
      query = <<-'GRAPHQL'
        query GetDocument($doc_id: String!) {
          document(docId: $doc_id) {
            id
            stateId
            state
          }
        }
      GRAPHQL

      internal_graphql_execute(query, { doc_id: SecureRandom.uuid })

      expect(response.success?).to be true

      expect(response.data['document']).to be nil
    end

    it 'can query no document' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      document = create(:docs_document)
      # document
      query = <<-'GRAPHQL'
        query GetDocument($doc_id: String!) {
          document(docId: $doc_id) {
            id
            stateId
            state
          }
        }
      GRAPHQL

      internal_graphql_execute(query, { doc_id: document.id })

      expect(response.success?).to be true

      expect(response.data['document']['id']).to eq document.id
      expect(response.data['document']['stateId']).to eq document.state_id
      expect(response.data['document']['state']).to eq Base64.strict_encode64(document.state)
    end
  end
end
