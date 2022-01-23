# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::Formulas, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetFormulas($webid: String!) {
        formulas(webid: $webid) {
          id
          name
          cacheValue
          blockId
          definition
          type
          updatedAt
          createdAt
        }
      }
    GRAPHQL

    it 'normal' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      block = create(:docs_block, pod: user.personal_pod)
      formula = Docs::Formula.create!(
        block_id: block.id, id: SecureRandom.uuid, name: 'foo',
        cache_value: { "type" => 'string', 'value' => '123' }, definition: "=123"
      )

      internal_graphql_execute(query, { webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data['formulas'].count).to eq(1)
      expect(response.data['formulas'][0].slice!('updatedAt', 'createdAt')).to eq({
        'id' => formula.id,
        'blockId' => formula.block_id,
        'type' => formula.type,
        'name' => formula.name,
        'definition' => formula.definition,
        'cacheValue' => formula.cache_value
      })
    end
  end
end
