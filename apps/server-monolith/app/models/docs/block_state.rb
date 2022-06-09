# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_block_states
#
#  id            :uuid             not null, primary key
#  state         :binary
#  state_type    :enum             default("full"), not null
#  created_at    :datetime         not null
#  block_id      :uuid             not null
#  document_id   :uuid             not null
#  history_id    :uuid             not null
#  prev_state_id :uuid
#  space_id      :bigint           not null
#  user_id       :bigint           not null
#
class Docs::BlockState < ApplicationRecord # rubocop:disable Style/ClassAndModuleChildren
  belongs_to :space
  belongs_to :user, class_name: 'Accounts::User'
  belongs_to :history, class_name: 'Docs::DocumentHistory'

  before_validation do
    # ensure belongs to an document history
    unless history
      self.history = Docs::DocumentHistory.where(
        document_id: document_id,
        space_id: space_id,
        user_id:  user_id
      ).where(
        'created_at >= ?',
        (created_at || Time.zone.now) - BrickdocConfig.history_gap_threshold.minutes
      ).first_or_initialize
      history.created_at = Time.zone.now
      history.save
    end
  end
end
