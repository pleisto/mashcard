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
#  space_id    :bigint           not null
#
# Indexes
#
#  index_docs_formulas_on_block_id_and_name  (block_id,name) UNIQUE
#  index_docs_formulas_on_space_id           (space_id)
#

module Docs
  class Formula < ApplicationRecord
    self.inheritance_column = :_type_disabled

    belongs_to :block, class_name: 'Docs::Block'
    belongs_to :space, optional: true

    enum type: {
      normal: 0,
      spreadsheet: 1,
    }

    before_create do
      self.space_id = block.space_id
    end
  end
end
