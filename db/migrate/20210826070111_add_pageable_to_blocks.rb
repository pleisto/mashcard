# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AddPageableToBlocks < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    add_column :docs_blocks, :page, :boolean, default: false, null: false
    Docs::Block.unscoped.where(type: 'doc').update_all(page: true)
  end

  def down
    remove_column :docs_blocks, :page
  end
end
