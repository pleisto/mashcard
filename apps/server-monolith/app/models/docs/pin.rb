# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_pins
#
#  id         :bigint           not null, primary key
#  deleted_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  block_id   :uuid             not null
#  space_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_docs_pins_on_user_id_and_space_id_and_block_id  (user_id,space_id,block_id) UNIQUE
#

module Docs
  class Pin < ApplicationRecord
    belongs_to :space
    belongs_to :user, class_name: 'Accounts::User'
    belongs_to :block, class_name: 'Docs::Block'

    delegate :text, :meta, to: :block
  end
end
