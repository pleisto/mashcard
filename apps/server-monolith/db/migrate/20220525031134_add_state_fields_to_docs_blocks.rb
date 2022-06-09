# frozen_string_literal: true

class AddStateFieldsToDocsBlocks < ActiveRecord::Migration[7.0]
  def change
    create_enum :block_type, ['document', 'component']

    add_column :docs_blocks, :state_id, :uuid
    add_column :docs_blocks, :block_type, :block_type
  end
end
