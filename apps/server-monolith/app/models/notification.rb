# frozen_string_literal: true

# == Schema Information
#
# Table name: notifications
#
#  id                              :bigint           not null, primary key
#  data(Notification data)         :json             not null
#  notification_type               :integer          not null
#  source_type                     :string
#  status(Unread / read / deleted) :integer          not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  source_id                       :string
#  user_id                         :bigint           not null
#
# Indexes
#
#  index_notifications_on_source_type_and_source_id  (source_type,source_id)
#  index_notifications_on_user_id                    (user_id)
#
class Notification < ApplicationRecord
  belongs_to :source, polymorphic: true, optional: true

  enum notification_type: {
    at: 0,
    create_conversation_on_page: 5,
    conversation_update: 6,
  }

  enum status: {
    unread: 0,
    read: 1,
    deleted: 10,
  }

  before_create do
    self.status ||= :unread
  end

  after_create do
    Rails.logger.info('TODO broadcast notification')
  end
end
