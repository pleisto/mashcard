# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::Conversation, type: :model do
  let(:block) { create(:docs_block) }
  let(:user) { create(:accounts_user) }

  it 'create conversation comment' do
    expect(block.doc_conversations.length).to eq(0)

    comment = described_class.create_conversation_comment!(
      creator: user,
      doc: block,
      content: { foo: 'bar' }
    )
    expect(block.doc_conversations.reload.length).to eq(1)
    expect(comment.conversation.notifications.length).to eq(1)
  end

  it 'append comment' do
    user = create(:accounts_user)
    user2 = create(:accounts_user)
    expect(block.doc_conversations.length).to eq(0)

    comment1 = described_class.create_conversation_comment!(
      creator: user,
      doc: block,
      content: { foo: 'bar' }
    )

    expect(comment1.conversation.collaborators).to eq([user.id])

    comment2 = comment1.conversation.append_comment!(
      creator: user2,
      content: { baz: 'baz' }
    )

    expect(comment1.conversation.reload.collaborators).to eq([user.id, user2.id])

    expect(comment1.notifications.length).to eq(0)
    expect(comment1.conversation.notifications.length).to eq(1)
    expect(comment2.notifications.length).to eq(1)
  end
end
