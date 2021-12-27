# frozen_string_literal: true
# == Schema Information
#
# Table name: docs_pins
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  pod_id     :integer          not null
#  block_id   :uuid             not null
#  deleted_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_docs_pins_on_user_id_and_pod_id_and_block_id  (user_id,pod_id,block_id) UNIQUE
#

class Docs::Pin < ApplicationRecord
  belongs_to :pod
  belongs_to :user, class_name: 'Accounts::User'
  belongs_to :block, class_name: 'Docs::Block'

  delegate :text, :meta, to: :block
end
