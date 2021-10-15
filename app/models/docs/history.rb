# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_histories
#
#  id                    :bigint           not null, primary key
#  content(node content) :jsonb
#  data                  :jsonb            not null
#  deleted_at            :datetime
#  history_version       :bigint           not null
#  meta                  :jsonb            not null
#  sort                  :bigint           not null
#  text(node text)       :text             default("")
#  type                  :string(32)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  block_id              :uuid             not null
#  parent_id             :uuid
#  pod_id                :bigint
#
# Indexes
#
#  index_docs_histories_on_block_id_and_history_version  (block_id,history_version) UNIQUE
#  index_docs_histories_on_pod_id                        (pod_id)
#
class Docs::History < ApplicationRecord
  self.inheritance_column = :_type_disabled

  belongs_to :pod, optional: true
  belongs_to :block

  def self.from_version_meta(version_meta)
    return [] if version_meta.blank?
    # parameters = version_meta.map { |k, v| "(#{k},#{v})" }.join(',')
    # Docs::History.where("(block_id, history_version) IN (?)", parameters)
    parameters = version_meta.size.times.collect { '(?,?)' }.join(',')
    Docs::History.where(deleted_at: nil).where("(block_id, history_version) IN (#{parameters})", *version_meta.flatten)
  end

  def self.graphql_normalize(root_id)
    histories = all
    block_ids = histories.map(&:block_id)
    preload_attachments = ActiveStorage::Attachment.where(name: "attachments", record_type: "Docs::Block", record_id: block_ids).pluck(
      :blob_id, :record_id
    ).to_h
    preload_blobs = ActiveStorage::Blob.where(id: preload_attachments.keys).each_with_object({}) do |blob, h|
      h[preload_attachments.fetch(blob.id)] =
        h[preload_attachments.fetch(blob.id)].to_a + [{ blob_key: blob.key, url: blob.real_url,
                                                        download_url: blob.real_url(disposition: "attachment") }]
    end

    histories.map { |h| h.cast_block.merge('blobs' => preload_blobs[h.block_id].to_a, 'root_id' => root_id) }
  end

  def update_params
    attributes.slice('sort', 'meta', 'data', 'parent_id', 'type', 'text', 'content', 'deleted_at')
  end

  ## TODO refactor this
  ## try `def id = block_id`
  def cast_block
    attributes.slice(
      'sort', 'history_version', 'created_at', 'updated_at', 'meta', 'data', 'parent_id', 'type', 'pod_id', 'text', 'content'
    ).merge('id' => block_id)
  end
end
