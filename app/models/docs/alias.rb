# frozen_string_literal: true
# == Schema Information
#
# Table name: docs_aliases
#
#  id         :bigint           not null, primary key
#  alias      :string           not null
#  payload    :json             not null
#  state      :integer          default("enabled"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  block_id   :uuid             not null
#  space_id   :bigint           not null
#
# Indexes
#
#  index_docs_aliases_on_block_id            (block_id)
#  index_docs_aliases_on_space_id_and_alias  (space_id,alias) UNIQUE
#

class Docs::Alias < ApplicationRecord
  belongs_to :space, optional: true
  belongs_to :block, class_name: 'Docs::Block'

  enum state: {
    enabled: 0,
    disabled: 10
  }

  before_create do
    self.space_id ||= block.space_id
  end

  def key
    alias_in_database
  end
end
