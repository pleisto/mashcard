# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_snapshots
#
#  id                                                   :bigint           not null, primary key
#  name                                                 :string
#  snapshot_version                                     :bigint           not null
#  version_meta(child block_id and history_version map) :jsonb
#  created_at                                           :datetime         not null
#  updated_at                                           :datetime         not null
#  block_id                                             :uuid             not null
#  pod_id                                               :bigint
#
# Indexes
#
#  index_docs_snapshots_on_block_id  (block_id)
#  index_docs_snapshots_on_pod_id    (pod_id)
#
class Docs::Snapshot < ApplicationRecord
  belongs_to :pod, optional: true
  belongs_to :block

  before_create do
    self.pod_id = block.pod_id
    self.snapshot_version = block.snapshot_version
    self.name ||= generate_default_name

    ## NOTE save children's version as snapshot
    self.version_meta = block.children_version_meta
  end

  def generate_default_name
    "SNAPSHOT [#{snapshot_version}] #{Time.current}"
  end

  def blocks
    # Before: save snapshot_id in all of child blocks
    # Docs::History.where("? = ANY(snapshots)", id)

    # After: save snapshot_id only in current block
    Docs::History.from_version_meta(version_meta)
  end
end
