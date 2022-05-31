# == Schema Information
#
# Table name: docs_comments
#
#  id                       :bigint           not null, primary key
#  content(Comment content) :json             not null
#  status(deleted)          :integer          not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  conversation_id          :bigint           not null
#  creator_id               :bigint           not null
#
# Indexes
#
#  index_docs_comments_on_conversation_id  (conversation_id)
#  index_docs_comments_on_creator_id       (creator_id)
#
module Docs
  class Comment < ApplicationRecord
    belongs_to :conversation, class_name: 'Docs::Conversation', foreign_key: :conversation_id
    belongs_to :creator, class_name: 'Accounts::User', foreign_key: :creator_id
    has_many :notifications, class_name: 'Accounts::Notification', as: :source, dependent: :restrict_with_exception

    before_create do
      self.status ||= :normal
    end

    enum status: {
      normal: 0,
      deleted: 10
    }

    after_create do
      self.conversation.notify_collaborators_by_comment!(self)
      self.conversation.update_latest_comment!(self)
    end

    def to_graphql
      attributes.merge(creator: creator)
    end

    def notify_conversation_collaborator_by_user_id!(user_id)
      Accounts::Notification.create!(
        user_id: user_id,
        source_type: 'Docs::Comment',
        source_id: self.id,
        data: self.notify_conversation_collaborators_data,
        notification_type: :conversation_update
      )
    end

    def notify_conversation_collaborators_data
      { todo: 'comment notify' }
    end
  end
end
