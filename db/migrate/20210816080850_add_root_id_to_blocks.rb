# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AddRootIDToBlocks < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    add_column :docs_blocks, :root_id, :uuid
    remove_column :docs_histories, :path

    Docs::Block.where(type: 'doc').each do |block|
      block.descendants_raw.update_all(root_id: block.id)
    end
  end

  def down
    remove_column :docs_blocks, :root_id
    add_column :docs_histories, :path, :uuid, array: true
    add_index :docs_histories, :path, using: :gin
  end
end
