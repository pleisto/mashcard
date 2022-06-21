# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::DocumentHistory, type: :model do
  describe 'create history automatically when state created' do
    let(:block) { create(:docs_block) }
    let(:user) { create(:accounts_user) }

    it 'can be created when state saved' do
      expect do
        state1 = Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil
        )
        expect(state1.history_id).to eq(Docs::DocumentHistory.last.id)
      end.to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }.by(1)
    end

    it 'can be created when new states have a gap to previous' do
      created_at = Time.zone.now
      expect do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil, created_at: created_at
        )
      end.to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }.by(1)

      expect do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil, created_at: created_at + 1
        )
      end.not_to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }

      expect do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil,
          created_at: created_at + 1 + MashcardConfig.history_gap_threshold.minutes
        )
      end.to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }.by(1)
    end

    it 'can be created when previous have too many states' do
      expect do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil
        )
      end.to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }.by(1)

      expect do
        (MashcardConfig.history_max_states - 1).times do
          Docs::BlockState.create!(
            id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
            document_id: block.id, block_id: block.id,
            state: Random.bytes(50), state_type: 'full', prev_state_id: nil
          )
        end
      end.not_to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }

      expect do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil
        )
      end.to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }.by(1)
    end

    it 'can be created when over interval from last state' do
      created_at = MashcardConfig.history_min_interval.minutes.ago
      expect do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil, created_at: created_at
        )
      end.to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }.by(1)

      expect do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          state: Random.bytes(50), state_type: 'full', prev_state_id: nil
        )
      end.to change {
        Docs::DocumentHistory.where(document_id: block.id).count
      }.by(1)
    end
  end
end
