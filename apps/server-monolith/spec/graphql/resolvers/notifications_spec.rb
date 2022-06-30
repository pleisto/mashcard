# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Notifications, type: :query, focus: true do
  describe '#resolver' do
    query = <<~TEXT
      query getNotifications {
        notifications {
          notificationType
          status
          type
          data
          conversation {
            id
          }
          comment {
            id
          }
        }
      }
    TEXT

    it 'auth' do
      self.current_user = nil
      graphql_execute(query, {})
      expect(response.errors).to be {}
      expect(response.success?).to be true
      expect(response.data).to be {}
    end

    it 'create' do
      owner = create(:accounts_user)
      block = create(:docs_block, pod: owner.personal_pod)
      user = create(:accounts_user)

      comment1 = Docs::Conversation.create_conversation_comment!(
        creator: user,
        doc: block,
        content: { foo: 'bar' }
      )

      self.current_user = owner
      self.current_pod = owner.personal_pod.as_session_context

      graphql_execute(query, {})

      expect(response.errors).to be {}
      expect(response.success?).to be true
      expect(response.data['notifications']).to eq([{
        'comment' => nil,
        'conversation' => {'id' => comment1.conversation.id.to_s},
        'status' => 'unread',
        'type' => 'Conversation',
        'notificationType' => 'create_conversation_on_page',
        "data"=>{"todo"=>"conversation notify"},
      }])

      self.current_user = nil
      self.current_pod = nil
    end

    it 'append' do
      block = create(:docs_block)
      user = create(:accounts_user)
      user2 = create(:accounts_user)

      comment1 = Docs::Conversation.create_conversation_comment!(
        creator: user,
        doc: block,
        content: { foo: 'bar' }
      )

      comment2 = comment1.conversation.append_comment!(
        creator: user2,
        content: { baz: 'baz' }
      )

      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      graphql_execute(query, {})

      expect(response.errors).to be {}
      expect(response.success?).to be true
      expect(response.data['notifications']).to eq([{
        'conversation' => nil,
        'comment' => {'id' => comment2.id.to_s},
        'status' => 'unread',
        'type' => 'Comment',
        'notificationType' => 'conversation_update',
        "data"=>{"todo"=>"comment notify"},
      }])

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
