# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AddShareLinks < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def change
    create_table :docs_share_links do |t|
      t.uuid :block_id, null: false, comment: "Page id"
      t.bigint :pod_id, null: false
      t.bigint :user_id
      t.string :key, null: false, comment: "Unique key"
      t.bigint :state, null: false, default: 0, comment: "Status"
      t.string :policy, null: false, comment: "Share policy"
      t.json :payload
      t.datetime :expired_at
      t.bigint :target_pod_ids, array: true, default: [], null: false
      t.timestamps

      t.index :key, unique: true
      t.index :target_pod_ids, using: :gin
      t.index [:block_id, :state, :policy]
    end
  end
end
