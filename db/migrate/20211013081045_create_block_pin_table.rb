# frozen_string_literal: true

class CreateBlockPinTable < ActiveRecord::Migration[7.0]
  def change
    create_table :docs_pins do |t|
      t.bigint :user_id, null: false
      t.bigint :pod_id, null: false
      t.uuid :block_id, null: false
      t.datetime :deleted_at
      t.timestamps null: false

      t.index [:user_id, :pod_id, :block_id], unique: true
    end
  end
end
