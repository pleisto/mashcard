# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AdjustShareLinkTable < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    Docs::ShareLink.delete_all

    remove_column :docs_share_links, :target_pod_ids
    remove_column :docs_share_links, :expired_at
    remove_column :docs_share_links, :user_id
    remove_column :docs_share_links, :payload
    remove_column :docs_share_links, :policy
    add_column :docs_share_links, :share_webid, :string, null: false
    add_column :docs_share_links, :policy, :integer, null: false
    add_index :docs_share_links, :share_webid

    Docs::ShareLink.reset_column_information
  end

  def down
    remove_column :docs_share_links, :share_webid
    remove_column :docs_share_links, :policy
    add_column :docs_share_links, :payload, :json
    add_column :docs_share_links, :user_id, :bigint
    add_column :docs_share_links, :expired_at, :datetime
    add_column :docs_share_links, :policy, :string, null: false
    add_column :docs_share_links, :target_pod_ids, :bigint, array: true, default: [], null: false
  end
end
