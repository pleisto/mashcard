# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_blocks
#
#  id               :uuid             not null, primary key
#  children         :uuid             is an Array
#  collaborators    :bigint           default([]), not null, is an Array
#  data(data props) :jsonb            not null
#  deleted_at       :datetime
#  meta(metadata)   :jsonb            not null
#  parent_type      :string(32)
#  type             :string(32)
#  version          :bigint           default(0), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  parent_id        :uuid
#  pod_id           :bigint
#
# Indexes
#
#  index_docs_blocks_on_children       (children) USING gin
#  index_docs_blocks_on_collaborators  (collaborators) USING gin
#  index_docs_blocks_on_deleted_at     (deleted_at)
#  index_docs_blocks_on_parent_id      (parent_id)
#  index_docs_blocks_on_pod_id         (pod_id)
#
class Docs::Block < ApplicationRecord
  # disable STI
  self.inheritance_column = :_type_disabled

  belongs_to :pod

  validates :meta, presence: true, allow_blank: true
  validates :data, presence: true
  validates :pod, presence: true
  validates :collaborators, presence: true
end
