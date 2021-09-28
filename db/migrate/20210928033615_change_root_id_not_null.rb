# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class ChangeRootIDNotNull < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def change
    change_column :docs_blocks, :root_id, :uuid, null: false
    change_column :docs_blocks, :pod_id, :bigint, null: false
    change_column :docs_blocks, :sort, :bigint, null: false, default: 0
  end
end
