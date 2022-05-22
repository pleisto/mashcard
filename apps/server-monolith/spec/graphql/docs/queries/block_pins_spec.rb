# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::BlockPins, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockPins {
        blockPins {
          blockId
          text
          meta {
            icon {
              ... on BlockImage {
                type
                source
                key
              }

              ... on BlockEmoji {
                type
                name
                emoji
              }
            }
          }
        }
      }
    GRAPHQL

    it 'anonymous' do
      self.current_space = Space::ANONYMOUS_CONTEXT

      internal_graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data).to eq('blockPins' => [])
    end

    it 'normal' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data).to eq('blockPins' => [])

      block = create(:docs_block, space: user.personal_space)
      pin = Docs::Pin.create!(user_id: user.id, space_id: user.personal_space.id, block_id: block.id)

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['blockPins'].count).to eq(1)
      expect(response.data['blockPins'][0]['blockId']).to eq(block.id)
      expect(response.data['blockPins'][0]['text']).to eq(block.text)

      pin.update!(deleted_at: Time.current)

      internal_graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data).to eq('blockPins' => [])
    end
  end
end
