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
    let(:block) { create(:docs_block, space: user.personal_space) }

    it 'update' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      formula = Docs::Formula.create!(
        block_id: block.id, id: SecureRandom.uuid, name: 'formula update',
        definition: "=123", cache_value: { type: 'string', value: '123' }
      )

      new_name = "formula update name"

      input = { input: {
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
      self.current_space = nil
    end
  end
end
