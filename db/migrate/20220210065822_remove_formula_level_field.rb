# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class RemoveFormulaLevelField < ActiveRecord::Migration[7.0]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    remove_column :docs_formulas, :level
  end

  def down
    add_column :docs_formulas, :level, :integer, null: false, default: 0
  end
end
