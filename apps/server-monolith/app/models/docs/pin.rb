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
#  pod_id     :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_docs_pins_on_user_id_and_pod_id_and_block_id  (user_id,pod_id,block_id) UNIQUE
#

module Docs
  class Pin < ApplicationRecord
    belongs_to :pod
    belongs_to :user, class_name: 'User'
    belongs_to :block, class_name: 'Docs::Block'

    delegate :text, :meta, to: :block
  end
end
