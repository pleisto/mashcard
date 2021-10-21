# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AddLastPodIDAndLastBlockID < ActiveRecord::Migration[7.0]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def change
    add_column :accounts_users, :last_webid, :string
    add_column :accounts_users, :last_block_id, :uuid
  end
end
