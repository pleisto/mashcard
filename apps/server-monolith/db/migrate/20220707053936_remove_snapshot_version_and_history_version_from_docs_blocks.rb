# frozen_string_literal: true

class RemoveSnapshotVersionAndHistoryVersionFromDocsBlocks < ActiveRecord::Migration[7.0]
  def change
    remove_column :docs_blocks, :history_version, :bigint, default: 0, null: false
    remove_column :docs_blocks, :snapshot_version, :bigint, default: 0, null: false
  end
end
