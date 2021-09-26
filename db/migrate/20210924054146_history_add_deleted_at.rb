# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class HistoryAddDeletedAt < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def change
    add_column :docs_histories, :deleted_at, :datetime, null: true
  end
end
