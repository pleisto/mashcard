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
      preload_histories = blocks.each_with_object({}) do |history, h|
        h[history.block_id] = history
      end

      update_blocks = []
      now = Time.current

      block.descendants(unscoped: true).includes(:pod).each do |child_block|
        child_history = preload_histories[child_block.id]
        if child_history.nil?
          child_block.deleted_at = now
        else
          child_history.update_params.each do |key, value|
            child_block.send("#{key}=", value)
          end
        end

        if child_block.important_field_changed?
          update_blocks << child_block
        end
      end

      if update_blocks.present?
        block.prepare_descendants
        update_blocks.map do |block|
          block.history_version = block.realtime_history_version_increment
          block
        end

        insert_histories = update_blocks.map do |block|
          block.history_attributes.merge('created_at' => now, 'updated_at' => now)
        end

        Docs::Block.upsert_all(update_blocks.map(&:block_attributes))
        Docs::History.insert_all(insert_histories)
      end
    end
  end
end
