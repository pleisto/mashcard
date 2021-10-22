# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AddLastBlockIdsField < ActiveRecord::Migration[7.0]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    add_column :accounts_users, :last_block_ids, :json, default: {}, null: false
    remove_column :accounts_users, :last_block_id
  end

  def down
    remove_column :accounts_users, :last_block_ids
    add_column :accounts_users, :last_block_id, :uuid
  end
end
