# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::Formulas, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetFormulas($domain: String!, $ids: String) {
        formulas(domain: $domain, ids: $ids) {
          id
          name
          cacheValue
          blockId
          definition
          type
          updatedAt
          createdAt
          meta
        }
      }
    GRAPHQL

    it 'normal' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      block = create(:docs_block, space: user.personal_space)
      formula = Docs::Formula.create!(
        block_id: block.id, id: Brickdoc::Utils::Encoding::UUID.gen_v4, name: 'foo', meta: {},
        cache_value: { 'type' => 'string', 'value' => '123' }, definition: '=123'
      )

      internal_graphql_execute(query, { domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['formulas'].count).to eq(1)
      expect(response.data['formulas'][0].slice!('updatedAt', 'createdAt')).to eq({
        'id' => formula.id,
        'blockId' => formula.block_id,
        'type' => formula.type,
        'name' => formula.name,
        'meta' => formula.meta,
        'definition' => formula.definition,
        'cacheValue' => formula.cache_value,
      })
    end
  end
end
