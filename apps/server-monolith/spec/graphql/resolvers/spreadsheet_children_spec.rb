# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::SpreadsheetChildren, type: :query do
  describe '#resolver' do
    it 'can query all blocks and formulas under a spreadsheetBlock' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)
      self.current_pod = pod.as_session_context

      parent_block = create(:docs_block, pod: pod, type: 'spreadsheetBlock', collaborators: [user.id])
      _rows_blocks = create_list(:docs_block, 10, pod: pod, type: 'spreadsheetRow', parent: parent_block)

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

      graphql_execute(query, { parent_id: parent_block.id })

      expect(response.success?).to be true

      expect(response.data['spreadsheetChildren']['blocks'].length).to eq 10
    end
  end
end
