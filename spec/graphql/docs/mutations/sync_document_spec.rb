# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::SyncDocument, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation SyncDocument($input: SyncDocumentInput!) {
        syncDocument(input: $input) {
          errors
          document {
            state
            stateId
          }
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, space: user.personal_space) }

    it 'can save fresh document' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      doc_id = SecureRandom.uuid
      state = Random.bytes(50)
      state_id = SecureRandom.uuid

      input = {
        input: {
          docId:      doc_id,
          operatorId: SecureRandom.uuid,
          state:      Base64.strict_encode64(state),
          stateId:    state_id,
        }
      }
      internal_graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['syncDocument']['document']['stateId']).to eq(state_id)
      expect(response.data['syncDocument']['document']['state']).to eq(nil)

      document = Docs::Document.find(doc_id)
      expect(document.state).to eq(state)
      expect(document.state_id).to eq(state_id)

      self.current_user = nil
      self.current_space = nil
    end

    it 'can return latest state with different state_id' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      document = create(:docs_document)

      state = Random.bytes(50)
      state_id = SecureRandom.uuid

      input = {
        input: {
          docId:           document.id,
          operatorId:      SecureRandom.uuid,
          state:           Base64.strict_encode64(state),
          stateId:         state_id,
          previousStateId: SecureRandom.uuid,
        }
      }
      internal_graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['syncDocument']['document']['stateId']).to eq(document.state_id)
      expect(response.data['syncDocument']['document']['state']).to eq(Base64.strict_encode64(document.state))

      # document = Docs::Document.find(document.id)
      # # expect(document.state).to eq(state)
      # expect(document.state_id).to eq(document.state_id)

      self.current_user = nil
      self.current_space = nil
    end

  end
end
