# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Blocks::Commit, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation BlockCommit($input: BlockCommitInput!) {
        blockCommit(input: $input) {
          errors
          block {
            id
            statesCount
            stateId
            blockType
          }
          diffStates {
            id
            state
          }
          requireFull
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'can save fresh block with full state' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      state = Random.bytes(50)
      state_id = Mashcard::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateType: 'full',
          state: Mashcard::Utils::Encoding::Base64.strict_encode64(state),
          stateId: state_id,
          statesCount: 0,
        },
      }
      graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(1)
      expect(response.data['blockCommit']['block']['stateId']).to eq(state_id)
      expect(response.data['blockCommit']['diffStates'].length).to eq(0)

      block_model = Docs::Block.find(block.id)
      state_model = Docs::BlockState.find(input[:input][:stateId])

      expect(block_model.state_id).to eq(state_model.id)

      expect(state_model.user_id).to eq(current_user.id)
      expect(state_model.pod_id).to eq(current_pod['id'])

      self.current_user = nil
      self.current_pod = nil
    end

    it 'can save block with full state which is next state' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      block.state_id = Mashcard::Utils::Encoding::UUID.gen_v4
      block.save

      Docs::BlockState.create!(
        id: block.state_id, user_id: user.id, pod_id: user.personal_pod.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50),
      )

      state = Random.bytes(50)
      state_id = Mashcard::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateType: 'full',
          state: Mashcard::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: block.state_id,
          stateId: state_id,
          statesCount: 1,
        },
      }
      graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(1)
      expect(response.data['blockCommit']['block']['stateId']).to eq(state_id)
      expect(response.data['blockCommit']['diffStates'].length).to eq(0)

      block_model = Docs::Block.find(block.id)
      state_model = Docs::BlockState.find(input[:input][:stateId])

      expect(block_model.state_id).to eq(state_model.id)

      expect(state_model.user_id).to eq(current_user.id)
      expect(state_model.pod_id).to eq(current_pod['id'])

      self.current_user = nil
      self.current_pod = nil
    end

    it 'can save block with update state which is next state and not to change block state id' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      block.state_id = Mashcard::Utils::Encoding::UUID.gen_v4
      block.save

      Docs::BlockState.create!(
        id: block.state_id, user_id: user.id, pod_id: user.personal_pod.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50)
      )

      state = Random.bytes(50)
      state_id = Mashcard::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateType: 'update',
          state: Mashcard::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: block.state_id,
          stateId: state_id,
          statesCount: 1,
        },
      }
      graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['stateId']).to eq(block.state_id)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(2)

      block_model = Docs::Block.find(block.id)
      state_model = Docs::BlockState.find(input[:input][:stateId])

      expect(block_model.state_id).to eq(input[:input][:prevStateId])

      expect(state_model.user_id).to eq(current_user.id)
      expect(state_model.pod_id).to eq(current_pod['id'])

      self.current_user = nil
      self.current_pod = nil
    end

    it 'cannot save block with state which is not next state' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      block.state_id = Mashcard::Utils::Encoding::UUID.gen_v4
      block.save

      full_state = Docs::BlockState.create!(
        id: block.state_id, user_id: user.id, pod_id: user.personal_pod.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50)
      )

      update_state2 = Docs::BlockState.create!(
        id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50), state_type: 'update', prev_state_id: full_state.id
      )

      update_state1 = Docs::BlockState.create!(
        id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50), state_type: 'update', prev_state_id: full_state.id, created_at: Time.zone.now - 3
      )

      state = Random.bytes(50)
      state_id = Mashcard::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateType: 'update',
          state: Mashcard::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateId: state_id,
          statesCount: 3,
        },
      }
      graphql_execute(mutation, input)

      expect(response.success?).to be(true)

      block_model = Docs::Block.find(block.id)
      expect(block_model.state_id).to eq(block.state_id)

      expect do
        Docs::BlockState.find(input[:input][:stateId])
      end.to raise_exception(ActiveRecord::RecordNotFound)

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateType: 'full',
          state: Mashcard::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateId: state_id,
          statesCount: 3,
        },
      }
      graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(3)
      expect(response.data['blockCommit']['block']['stateId']).to eq(full_state.id)
      expect(response.data['blockCommit']['diffStates'].length).to eq(3)
      expect(response.data['blockCommit']['diffStates'][0]['id']).to eq(full_state.id)
      expect(response.data['blockCommit']['diffStates'][0]['state']).to eq(
        Mashcard::Utils::Encoding::Base64.strict_encode64(full_state.state)
      )
      expect(response.data['blockCommit']['diffStates'][1]['id']).to eq(update_state1.id)
      expect(response.data['blockCommit']['diffStates'][2]['id']).to eq(update_state2.id)

      block_model = Docs::Block.find(block.id)
      expect(block_model.state_id).to eq(block.state_id)

      expect do
        Docs::BlockState.find(input[:input][:stateId])
      end.to raise_exception(ActiveRecord::RecordNotFound)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'can not save block with update state which is have too many updates' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      block.state_id = Mashcard::Utils::Encoding::UUID.gen_v4
      block.save

      prev_state = Docs::BlockState.create!(
        id: block.state_id, user_id: user.id, pod_id: user.personal_pod.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50)
      )

      MashcardConfig.state_max_updates.times do
        Docs::BlockState.create!(
          id: Mashcard::Utils::Encoding::UUID.gen_v4, user_id: user.id, pod_id: user.personal_pod.id,
          document_id: block.id, block_id: block.id,
          prev_state_id: prev_state.id, state_type: 'update',
          state: Random.bytes(50)
        )
      end

      state = Random.bytes(50)
      state_id = Mashcard::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateType: 'update',
          state: Mashcard::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: block.state_id,
          stateId: state_id,
          statesCount: 1,
        },
      }
      graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['requireFull']).to be(true)

      block_model = Docs::Block.find(block.id)

      expect(block_model.state_id).to eq(prev_state.id)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'can save block meta' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      state = Random.bytes(50)
      state_id = Mashcard::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Mashcard::Utils::Encoding::UUID.gen_v4,
          stateType: 'full',
          state: Mashcard::Utils::Encoding::Base64.strict_encode64(state),
          stateId: state_id,
          statesCount: 0,
          meta: {
            'title' => 'test',
            'icon' => {
              '__typename': 'BlockEmoji',
              'emoji': '😀',
              'name': 'grinning face',
              'type': 'EMOJI',
            },
          },
        },
      }
      graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(1)
      expect(response.data['blockCommit']['block']['stateId']).to eq(state_id)
      expect(response.data['blockCommit']['diffStates'].length).to eq(0)

      block_model = Docs::Block.find(block.id)
      state_model = Docs::BlockState.find(input[:input][:stateId])

      expect(block_model.state_id).to eq(state_model.id)
      expect(block_model.text).to eq('test')
      expect(block_model.meta['icon']['__typename']).to be_nil
      expect(block_model.meta['icon']['emoji']).to eq('😀')

      expect(state_model.user_id).to eq(current_user.id)
      expect(state_model.pod_id).to eq(current_pod['id'])

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
