# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::BlockPins, type: :query do
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
      self.current_pod = Pod::ANONYMOUS_CONTEXT

      graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data).to eq('blockPins' => [])
    end

    it 'normal' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data).to eq('blockPins' => [])

      block = create(:docs_block, pod: user.personal_pod)
      pin = Docs::Pin.create!(user_id: user.id, pod_id: user.personal_pod.id, block_id: block.id)

      graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['blockPins'].count).to eq(1)
      expect(response.data['blockPins'][0]['blockId']).to eq(block.id)
      expect(response.data['blockPins'][0]['text']).to eq(block.text)

      pin.update!(deleted_at: Time.current)

      graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data).to eq('blockPins' => [])
    end
  end
end
