# frozen_string_literal: true
class ChangeColumnNames < ActiveRecord::Migration[7.0]
  def change
    rename_column :accounts_members, :pod_id, :space_id
    rename_column :docs_aliases, :pod_id, :space_id
    rename_column :docs_blocks, :pod_id, :space_id
    rename_column :docs_formulas, :pod_id, :space_id
    rename_column :docs_histories, :pod_id, :space_id
    rename_column :docs_pins, :pod_id, :space_id
    rename_column :docs_share_links, :pod_id, :space_id
    rename_column :docs_share_links, :share_pod_id, :share_space_id
    rename_column :docs_snapshots, :pod_id, :space_id
    rename_column :active_storage_blobs, :pod_id, :space_id
    rename_table :pods, :spaces
    rename_column :spaces, :webid, :domain
    rename_column :accounts_users, :last_webid, :last_space_domain
    rename_index :spaces, :index_pods_on_lower_webid_text, :index_spaces_on_lower_domain_text
  end
end
