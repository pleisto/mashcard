# frozen_string_literal: true

class AddLtreeToBrickdocConfigs < ActiveRecord::Migration[7.0]
  def change
    # rubocop:disable Rails/ReversibleMigration
    enable_extension 'ltree'
    drop_table :brickdoc_configs
    create_table :brickdoc_configs do |t|
      t.column :key, :ltree, null: false, comment: 'setting key with namespace'
      t.column :scope, :ltree, null: false, default: 'R',
        comment: 'scope for recursive search. e.g. R.user_1.pod_2 or R.pod_1'
      t.jsonb :value
      t.index [:key, :scope], name: 'index_brickdoc_configs_on_key_and_scope', unique: true
    end
  end
end
