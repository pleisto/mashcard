# frozen_string_literal: true

class AddDocumentHistoryIDToDocsBlockState < ActiveRecord::Migration[7.0]
  def change
    add_column 'docs_block_states', 'history_id', :uuid, null: false
    add_column 'docs_block_states', 'document_id', :uuid, null: false
  end
end
