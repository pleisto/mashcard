# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_formulas
#
#  id          :uuid             not null, primary key
#  cache_value :json             not null
#  definition  :text             not null
#  meta        :json             not null
#  name        :string           not null
#  type        :integer          default("normal"), not null
#  version     :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  block_id    :uuid             not null
#  pod_id      :bigint           not null
#
# Indexes
#
#  index_docs_formulas_on_block_id_and_name  (block_id,name) UNIQUE
#  index_docs_formulas_on_pod_id             (pod_id)
#

module Docs
  class Formula < ApplicationRecord
    self.inheritance_column = :_type_disabled

    belongs_to :block, class_name: 'Docs::Block', optional: true
    belongs_to :pod, optional: true

    enum type: {
      normal: 0,
      spreadsheet: 1,
    }

    before_create do
      self.pod_id = block.pod_id
    end
  end
end
