# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::FormulaUpdate, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation formulaUpdate($input: FormulaUpdateInput!) {
        formulaUpdate(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'update' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      formula = Docs::Formula.create!(
        block_id: block.id, id: SecureRandom.uuid, name: 'formula update',
        view: {}, dependency_ids: [], definition: "=123", cache_value: { type: 'string', value: '123' }
      )

      new_name = "formula update name"

      input = { input: {
        dependencyIds: [],
        id: formula.id,
        blockId: block.id,
        name: new_name,
        definition: '=123 + 1'
      } }

      internal_graphql_execute(mutation, input)
      expect(response.success?).to eq(true)

      formula.reload

      expect(formula.name).to eq(new_name)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
