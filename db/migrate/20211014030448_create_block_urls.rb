# frozen_string_literal: true

class CreateBlockUrls < ActiveRecord::Migration[7.0]
  def change
    create_table :docs_aliases do |t|
      t.bigint :pod_id, null: false
      t.string :alias, null: false
      t.uuid :block_id, null: false

      t.json :payload, null: false, default: {}
      t.timestamps null: false

      t.integer :state, null: false, default: 0

      t.index [:pod_id, :alias], unique: true
      t.index :block_id
    end
  end
end
