# frozen_string_literal: true
class CreateBrickdocConfigs < ActiveRecord::Migration[6.1]
  def change
    create_table :brickdoc_configs do |t|
      t.string :key, null: false
      t.text :value
      t.string :scope, null: false
      t.string :domain, null: false
      t.integer :domain_len
    end

    add_index :brickdoc_configs, [:key, :scope, :domain], unique: true
  end
end
