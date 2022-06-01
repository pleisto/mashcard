# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_conversations
#
#  id                                  :bigint           not null, primary key
#  block_ids(Block ids)                :uuid             default([]), is an Array
#  collaborators                       :bigint           default([]), not null, is an Array
#  latest_reply_at                     :datetime
#  mark_ids(Mark ids)                  :uuid             default([]), is an Array
#  status(opened / resolved / deleted) :integer          not null
#  created_at                          :datetime         not null
#  updated_at                          :datetime         not null
#  creator_id                          :bigint           not null
#  doc_id                              :uuid             not null
#  space_id                            :bigint           not null
#
# Indexes
#
#  index_docs_conversations_on_collaborators  (collaborators) USING gin
#  index_docs_conversations_on_creator_id     (creator_id)
#  index_docs_conversations_on_doc_id         (doc_id)
#  index_docs_conversations_on_space_id       (space_id)
#
module Docs
  class Conversation < ApplicationRecord
    belongs_to :doc, class_name: 'Docs::Block'
    belongs_to :space, optional: true
    belongs_to :creator, class_name: 'Accounts::User'
    has_many :comments, dependent: :restrict_with_exception
    has_many :notifications, class_name: 'Accounts::Notification', as: :source, dependent: :restrict_with_exception

    before_create do
      self.status ||= :opened
      self.space_id ||= doc.space_id
    end

    after_create do
      notify_doc_collaborators!
    end

    enum status: {
      opened: 0,
      resolved: 1,
      deleted: 10,
    }

    def to_graphql
      attributes.merge(comments: comments.map(&:to_graphql))
    end

    # NOTE: exclude conversation creator
    def notify_doc_collaborators!
      (doc.collaborators - [creator_id]).each do |user_id|
        notify_doc_collaborators_by_user_id!(user_id)
      end
    end

    def notify_doc_collaborators_by_user_id!(user_id)
      Accounts::Notification.create!(
        user_id: user_id,
        source_type: 'Docs::Conversation',
        source_id: id,
        data: notify_doc_collaborators_data,
        notification_type: :create_conversation_on_page
      )
    end

    def notify_doc_collaborators_data
      { todo: 'conversation notify' }
    end

    # NOTE: exclude conversation creator
    def notify_collaborators_by_comment!(comment)
      (collaborators - [comment.creator_id]).each do |user_id|
        comment.notify_conversation_collaborator_by_user_id!(user_id)
      end
    end

    # 1. refresh `latest_reply_at`
    # 2. update `collaborators`
    def update_latest_comment!(comment)
      update!(latest_reply_at: comment.created_at, collaborators: (collaborators + [comment.creator_id]).uniq)
    end

    def self.create_conversation_comment!(creator:, doc:, content:, block_ids: [], mark_ids: [])
      Docs::Conversation.transaction do
        conversation = create!(
          doc_id: doc.id,
          creator_id: creator.id,
          collaborators: [creator.id],
          block_ids: block_ids || [],
          mark_ids: mark_ids || []
        )

        conversation.comments.create!(
          content: content,
          creator_id: creator.id
        )
      end
    end

    def append_comment!(creator:, content:)
      transaction do
        comments.create!(
          content: content,
          creator_id: creator.id
        )
      end
    end
  end
end
