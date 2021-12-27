# frozen_string_literal: true
# == Schema Information
#
# Table name: docs_aliases
#
#  id         :integer          not null, primary key
#  pod_id     :integer          not null
#  alias      :string           not null
#  block_id   :uuid             not null
#  payload    :json             default("{}"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  state      :integer          default("0"), not null
#
# Indexes
#
#  index_docs_aliases_on_block_id          (block_id)
#  index_docs_aliases_on_pod_id_and_alias  (pod_id,alias) UNIQUE
#

class Docs::Alias < ApplicationRecord
  belongs_to :pod, optional: true
  belongs_to :block, class_name: 'Docs::Block'

  enum state: {
    enabled: 0,
    disabled: 10
  }

  before_create do
    self.pod_id ||= block.pod_id
  end

  def key
    alias_in_database
  end
end
