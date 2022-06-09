# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockCommit, type: :mutation do
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
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, space: user.personal_space) }

    it 'can save fresh block with full state' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      state = Random.bytes(50)
      state_id = Brickdoc::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Brickdoc::Utils::Encoding::UUID.gen_v4,
          stateType: 'full',
          state: Brickdoc::Utils::Encoding::Base64.strict_encode64(state),
          stateId: state_id,
          statesCount: 0,
        },
      }
      internal_graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(1)
      expect(response.data['blockCommit']['block']['stateId']).to eq(state_id)
      expect(response.data['blockCommit']['diffStates'].length).to eq(0)

      block_model = Docs::Block.find(block.id)
      state_model = Docs::BlockState.find(input[:input][:stateId])

      expect(block_model.state_id).to eq(state_model.id)

      expect(state_model.user_id).to eq(current_user.id)
      expect(state_model.space_id).to eq(current_space['id'])

      self.current_user = nil
      self.current_space = nil
    end

    it 'can save block with full state which is next state' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      block.state_id = Brickdoc::Utils::Encoding::UUID.gen_v4
      block.save

      Docs::BlockState.create!(
        id: block.state_id, user_id: user.id, space_id: user.personal_space.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50),
      )

      state = Random.bytes(50)
      state_id = Brickdoc::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Brickdoc::Utils::Encoding::UUID.gen_v4,
          stateType: 'full',
          state: Brickdoc::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: block.state_id,
          stateId: state_id,
          statesCount: 1,
        },
      }
      internal_graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(1)
      expect(response.data['blockCommit']['block']['stateId']).to eq(state_id)
      expect(response.data['blockCommit']['diffStates'].length).to eq(0)

      block_model = Docs::Block.find(block.id)
      state_model = Docs::BlockState.find(input[:input][:stateId])

      expect(block_model.state_id).to eq(state_model.id)

      expect(state_model.user_id).to eq(current_user.id)
      expect(state_model.space_id).to eq(current_space['id'])

      self.current_user = nil
      self.current_space = nil
    end

    it 'can save block with update state which is next state and not to change block state id' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      block.state_id = Brickdoc::Utils::Encoding::UUID.gen_v4
      block.save

      Docs::BlockState.create!(
        id: block.state_id, user_id: user.id, space_id: user.personal_space.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50)
      )

      state = Random.bytes(50)
      state_id = Brickdoc::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Brickdoc::Utils::Encoding::UUID.gen_v4,
          stateType: 'update',
          state: Brickdoc::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: block.state_id,
          stateId: state_id,
          statesCount: 1,
        },
      }
      internal_graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['stateId']).to eq(block.state_id)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(2)

      block_model = Docs::Block.find(block.id)
      state_model = Docs::BlockState.find(input[:input][:stateId])

      expect(block_model.state_id).to eq(input[:input][:prevStateId])

      expect(state_model.user_id).to eq(current_user.id)
      expect(state_model.space_id).to eq(current_space['id'])

      self.current_user = nil
      self.current_space = nil
    end

    it 'cannot save block with state which is not next state' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      block.state_id = Brickdoc::Utils::Encoding::UUID.gen_v4
      block.save

      full_state = Docs::BlockState.create!(
        id: block.state_id, user_id: user.id, space_id: user.personal_space.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50)
      )

      update_state2 = Docs::BlockState.create!(
        id: Brickdoc::Utils::Encoding::UUID.gen_v4, user_id: user.id, space_id: user.personal_space.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50), state_type: 'update', prev_state_id: full_state.id
      )

      update_state1 = Docs::BlockState.create!(
        id: Brickdoc::Utils::Encoding::UUID.gen_v4, user_id: user.id, space_id: user.personal_space.id,
        document_id: block.id, block_id: block.id,
        state: Random.bytes(50), state_type: 'update', prev_state_id: full_state.id, created_at: Time.zone.now - 3
      )

      state = Random.bytes(50)
      state_id = Brickdoc::Utils::Encoding::UUID.gen_v4

      input = {
        input: {
          documentId: block.id,
          blockId: block.id,
          operatorId: Brickdoc::Utils::Encoding::UUID.gen_v4,
          stateType: 'update',
          state: Brickdoc::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: Brickdoc::Utils::Encoding::UUID.gen_v4,
          stateId: state_id,
          statesCount: 3,
        },
      }
      internal_graphql_execute(mutation, input)

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
          operatorId: Brickdoc::Utils::Encoding::UUID.gen_v4,
          stateType: 'full',
          state: Brickdoc::Utils::Encoding::Base64.strict_encode64(state),
          prevStateId: Brickdoc::Utils::Encoding::UUID.gen_v4,
          stateId: state_id,
          statesCount: 3,
        },
      }
      internal_graphql_execute(mutation, input)

      expect(response.success?).to be(true)
      expect(response.data['blockCommit']['block']['statesCount']).to eq(3)
      expect(response.data['blockCommit']['block']['stateId']).to eq(full_state.id)
      expect(response.data['blockCommit']['diffStates'].length).to eq(3)
      expect(response.data['blockCommit']['diffStates'][0]['id']).to eq(full_state.id)
      expect(response.data['blockCommit']['diffStates'][0]['state']).to eq(
        Brickdoc::Utils::Encoding::Base64.strict_encode64(full_state.state)
      )
      expect(response.data['blockCommit']['diffStates'][1]['id']).to eq(update_state1.id)
      expect(response.data['blockCommit']['diffStates'][2]['id']).to eq(update_state2.id)

      block_model = Docs::Block.find(block.id)
      expect(block_model.state_id).to eq(block.state_id)

      expect do
        Docs::BlockState.find(input[:input][:stateId])
      end.to raise_exception(ActiveRecord::RecordNotFound)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
