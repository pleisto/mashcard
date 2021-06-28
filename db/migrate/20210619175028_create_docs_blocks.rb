# frozen_string_literal: true
class CreateDocsBlocks < ActiveRecord::Migration[6.1]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    create_table :docs_blocks, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.belongs_to :pod, index: true
      t.string :type, limit: 32
      t.belongs_to :parent, null: true, type: :uuid, index: true
      t.string :parent_type, limit: 32
      t.jsonb :meta, null: false, default: {}, comment: 'metadata'
      t.jsonb :data, null: false, comment: 'data props'
      t.column :history_version, :bigint, null: false, default: 0
      t.column :snapshot_version, :bigint, null: false, default: 0
      t.column :sort, :decimal, precision: 15, scale: 10, null: false, default: 0
      t.bigint :collaborators, array: true, default: [], null: false
      t.datetime :deleted_at, null: true, index: true

      t.timestamps
      t.index :collaborators, using: :gin
    end
  end
end
