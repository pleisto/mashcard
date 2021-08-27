# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class RemoveParentTypeFromDocsBlock < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    remove_column :docs_blocks, :parent_type
    remove_column :docs_histories, :parent_type
  end

  def down
    add_column :docs_blocks, :parent_type, :string, limit: 32
    add_column :docs_histories, :parent_type, :string, limit: 32
  end
end
