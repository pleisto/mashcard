# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AddLevelAndVersionToFormula < ActiveRecord::Migration[7.0]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def change
    add_column :docs_formulas, :level, :integer, null: false, default: 0
    add_column :docs_formulas, :version, :integer, null: false, default: 0
    add_column :docs_formulas, :kind, :string, null: false, default: 'expression'
  end
end
