# frozen_string_literal: true

class CreateFormulaTable < ActiveRecord::Migration[7.0]
  # include Brickdoc::Database::MigrationHelpers

  def change
    create_table :docs_formulas, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.bigint :pod_id, null: false
      t.uuid :block_id, null: false
      t.string :name, null: false
      t.json :view, null: false, default: {}
      t.text :definition, null: false
      t.json :cache_value, null: false
      t.uuid :dependency_ids, null: false, default: [], array: true
      t.timestamps null: false

      t.index [:block_id, :name], unique: true
      t.index [:dependency_ids], using: :gin
      t.index [:pod_id]
    end
  end
end
