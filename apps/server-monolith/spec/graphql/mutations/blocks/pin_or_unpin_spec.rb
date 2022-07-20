# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Blocks::PinOrUnpin, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockPinOrUnpin($input: BlockPinOrUnpinInput!) {
        blockPinOrUnpin(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'work' do
      self.current_user = user

      block = create(:docs_block, pod: user.personal_pod)

      input = { input: { blockId: block.id, pin: true } }
      graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockPinOrUnpin' => nil })

      pin = Docs::Pin.find_by!(user_id: user.id, pod_id: block.pod_id, block_id: block.id)
      expect(pin.deleted_at).to be_nil

      input = { input: { blockId: block.id, pin: false } }
      graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockPinOrUnpin' => nil })

      pin.reload
      expect(pin.deleted_at).not_to be_nil

      self.current_user = nil
    end
  end
end
