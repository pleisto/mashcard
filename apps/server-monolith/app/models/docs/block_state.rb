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
#  pod_id        :bigint           not null
#  prev_state_id :uuid
#  user_id       :bigint           not null
#
class Docs::BlockState < ApplicationRecord # rubocop:disable Style/ClassAndModuleChildren
  belongs_to :pod
  belongs_to :user, class_name: 'User'
  belongs_to :history, class_name: 'Docs::DocumentHistory'

  before_validation do
    # ensure belongs to an document history
    unless history
      self.history = Docs::DocumentHistory.where(
        document_id: document_id,
        pod_id: pod_id,
        user_id:  user_id
      ).where(
        'created_at >= ?',
        (created_at || Time.zone.now) - MashcardConfig.history_gap_threshold.minutes
      ).first_or_initialize
      unless history.new_record?
        if (history.states.count >= MashcardConfig.history_max_states) ||
            (history.states.order('created_at DESC').first.created_at < MashcardConfig.history_min_interval.minutes.ago)
          self.history = Docs::DocumentHistory.new(
            document_id: document_id,
            pod_id: pod_id,
            user_id:  user_id
          )
        end
      end
      history.created_at = Time.zone.now
      history.save
    end
  end
end
