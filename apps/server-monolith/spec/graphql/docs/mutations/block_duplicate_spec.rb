# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockDuplicate, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockDuplicate($input: BlockDuplicateInput!) {
        blockDuplicate(input: $input) {
          id
          formulaIds
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'work' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      root_block = create(:docs_block, pod: user.personal_pod)

      input = { input: { id: root_block.id } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data['blockDuplicate']['errors']).to eq([])
      expect(response.data['blockDuplicate']['id']).not_to be_nil

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
