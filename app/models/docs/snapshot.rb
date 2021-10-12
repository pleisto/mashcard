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
#  index_docs_snapshots_on_block_id_and_snapshot_version  (block_id,snapshot_version) UNIQUE
#  index_docs_snapshots_on_pod_id                         (pod_id)
#
class Docs::Snapshot < ApplicationRecord
  belongs_to :pod, optional: true
  belongs_to :block
  include ActionView::Helpers::DateHelper

  before_create do
    self.pod_id = block.pod_id
    self.name ||= generate_default_name

    ## NOTE save children's version as snapshot
    self.version_meta = block.children_version_meta
  end

  def generate_default_name
    block.title.presence || ""
  end

  def relative_time
    time_ago_in_words(created_at)
  end

  def next_snapshot_name
    generate_default_name
  end

  def blocks
    # Before: save snapshot_id in all of child blocks
    # Docs::History.where("? = ANY(snapshots)", id)

    # After: save snapshot_id only in current block
    Docs::History.from_version_meta(version_meta)
  end

  def restore!
    transaction do
      ## 1. backup current state
      block.save_snapshot!(name: next_snapshot_name)

      ## 2. do restore
      preload_blocks = blocks.each_with_object({}) do |history, h|
        h[history.block_id] = history
      end

      block.descendants(unscoped: true).each do |child_block|
        child_history = preload_blocks[child_block.id]
        if child_history.nil?
          child_block.update!(deleted_at: Time.current)
        else
          child_block.update!(child_history.update_params)
        end
      end
    end
  end
end
