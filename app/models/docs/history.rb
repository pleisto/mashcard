# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_histories
#
#  id              :bigint           not null, primary key
#  data            :jsonb            not null
#  history_version :bigint           not null
#  meta            :jsonb            not null
#  parent_type     :string
#  path            :uuid             is an Array
#  sort            :bigint           not null
#  type            :string(32)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  block_id        :uuid             not null
#  parent_id       :uuid
#  pod_id          :bigint
#
# Indexes
#
#  index_docs_histories_on_block_id_and_history_version  (block_id,history_version) UNIQUE
#  index_docs_histories_on_path                          (path) USING gin
#  index_docs_histories_on_pod_id                        (pod_id)
#
class Docs::History < ApplicationRecord
  self.inheritance_column = :_type_disabled

  belongs_to :pod, optional: true
  belongs_to :block

  before_create do
    self.pod_id = block.pod_id
    self.data = block.data
    self.meta = block.meta
    self.sort = block.sort
    self.path = block.path_cache
    self.type = block.type
    self.parent_type = block.parent_type
    self.parent_id = block.parent_id
  end

  def children
    Docs::History.where("? = ANY(path)", block_id)
  end

  def self.from_version_meta(version_meta)
    # parameters = version_meta.map { |k, v| "(#{k},#{v})" }.join(',')
    # Docs::History.where("(block_id, history_version) IN (?)", parameters)
    parameters = version_meta.size.times.collect { '(?,?)' }.join(',')
    Docs::History.where("(block_id, history_version) IN (#{parameters})", *version_meta.flatten)
  end

  def self.graphql_normalize
    histories = all
    block_ids = histories.map(&:block_id)
    preload_attachments = ActiveStorage::Attachment.where(name: "attachments", record_type: "Docs::Block", record_id: block_ids).pluck(
      :blob_id, :record_id
    ).to_h
    preload_blobs = ActiveStorage::Blob.where(id: preload_attachments.keys).each_with_object({}) do |blob, h|
      h[preload_attachments.fetch(blob.id)] =
        h[preload_attachments.fetch(blob.id)].to_a + [{ blob_key: blob.key, url: Brickdoc::Storage.blob_url(blob) }]
    end

    histories.map { |h| h.cast_block.merge('blobs' => preload_blobs[h.block_id].to_a) }
  end

  ## TODO refactor this
  ## try `def id = block_id`
  def cast_block
    attributes.slice(
      'sort', 'history_version', 'created_at', 'updated_at', 'meta', 'data', 'parent_id', 'type', 'parent_type', 'pod_id'
    ).merge('id' => block_id)
  end
end
