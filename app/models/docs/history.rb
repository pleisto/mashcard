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
#  sort            :decimal(15, 10)  not null
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
  belongs_to :pod, optional: true
  belongs_to :block

  before_create do
    self.pod_id = block.pod_id
    self.history_version = block.history_version
    self.data = block.data
    self.meta = block.meta
    self.sort = block.sort
    self.path = block.path_cache
    self.parent_type = block.parent_type
    self.parent_id = block.parent_id
  end

  def children
    Docs::History.where("? = ANY(path)", block_id)
  end

  def self.from_meta(meta)
    parameters = meta.size.times.collect { '(?,?)' }.join(',')
    Docs::History.where("(block_id, history_version) IN (#{parameters})", *meta.flatten)
  end
end
