# frozen_string_literal: true

class CreateDeletedPermanentlyAt < ActiveRecord::Migration[6.1]
  def change
    add_column :docs_blocks, :deleted_permanently_at, :datetime, null: true
    remove_index :docs_blocks, :deleted_at
  end
end
