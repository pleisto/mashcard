# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::SpreadsheetChildren, type: :query do
  describe '#resolver' do
    it 'can query all blocks and formulas under a spreadsheetBlock' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      parent_block = create(:docs_block, space: space, type: 'spreadsheetBlock', collaborators: [user.id])
      _rows_blocks = create_list(:docs_block, 10, space: space, type: 'spreadsheetRow', parent: parent_block)

      # block
      query = <<-'GRAPHQL'
        query GetSpreadsheetChildren($parent_id: String!) {
          spreadsheetChildren(parentId: $parent_id) {
            blocks {
              id
            }
          }
        }
      GRAPHQL

      internal_graphql_execute(query, { parent_id: parent_block.id })

      expect(response.success?).to be true

      expect(response.data['spreadsheetChildren']['blocks'].length).to eq 10
    end
  end
end
