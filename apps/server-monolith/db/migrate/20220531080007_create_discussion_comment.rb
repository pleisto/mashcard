# frozen_string_literal: true

class CreateDiscussionComment < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts_notifications do |t|
      t.bigint :user_id, null: false
      t.integer :notification_type, null: false
      t.json :data, null: false, default: {}, comment: 'Notification data'
      t.integer :status, null: false, comment: 'Unread / read / deleted'

      t.string :source_id
      t.string :source_type

      t.timestamps

      t.index :user_id
      t.index [:source_type, :source_id]
    end

    create_table :docs_comments do |t|
      t.bigint :conversation_id, null: false
      t.bigint :creator_id, null: false
      t.json :content, null: false, comment: 'Comment content'
      t.integer :status, null: false, comment: 'deleted'
      t.timestamps

      t.index :conversation_id
      t.index :creator_id
    end

    create_table :docs_conversations do |t|
      t.bigint :space_id, null: false
      t.uuid :mark_ids, array: true, default: [], comment: 'Mark ids'
      t.uuid :block_ids, array: true, default: [], comment: 'Block ids'
      t.uuid :doc_id, null: false
      t.bigint :creator_id, null: false

      t.bigint :collaborators, array: true, default: [], null: false
      t.integer :status, null: false, comment: 'opened / resolved / deleted'
      t.datetime :latest_reply_at

      t.timestamps

      t.index :collaborators, using: :gin
      t.index :creator_id
      t.index :space_id
      t.index :doc_id
    end
  end
end
