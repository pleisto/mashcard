# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::SnapshotRestore, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation snapshotRestore($input: SnapshotRestoreInput!) {
        snapshotRestore(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'ok' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      block.save_snapshot!
      input = { input: { blockId: block.id, snapshotVersion: block.snapshot_version } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to be(true)
      expect(response.data).to eq({ "snapshotRestore" => nil })

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
