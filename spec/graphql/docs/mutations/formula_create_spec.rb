# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::FormulaCreate, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation formulaCreate($input: FormulaCreateInput!) {
        formulaCreate(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'create' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      input = { input: {
        dependencyIds: [], view: {},
        id: SecureRandom.uuid,
        blockId: block.id,
        name: 'create formula',
        cacheValue: { type: 'string', value: '123' }, definition: '=123'
      } }

      internal_graphql_execute(mutation, input)
      expect(response.success?).to eq(true)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
