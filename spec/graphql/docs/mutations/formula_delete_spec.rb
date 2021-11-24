# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::FormulaDelete, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation formulaDelete($input: FormulaDeleteInput!) {
        formulaDelete(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'delete' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      formula = Docs::Formula.create!(
        block_id: block.id, id: SecureRandom.uuid, name: 'formula delete',
        view: {}, dependency_ids: [], definition: "=123", cache_value: { 'value' => "123", 'type' => 'number' }
      )

      input = { input: {
        id: formula.id,
        blockId: block.id
      } }

      internal_graphql_execute(mutation, input)
      expect(response.success?).to eq(true)

      expect do
        formula.reload
      end.to raise_error(ActiveRecord::RecordNotFound)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
