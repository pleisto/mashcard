# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::Snapshot, type: :model do
  describe '.snapshots' do
    let(:child) { create(:docs_block_child) }

    it 'basic' do
      expect(child.parent_id).not_to be_nil
      expect(child.root_id).to eq(child.parent_id)
      expect(child.history_version).to eq(1)
      expect(child.snapshots.count).to eq(0)
      expect(child.snapshot_version).to eq(0)
      expect(child.realtime_snapshot_version_value).to eq(0)

      child.save_snapshot!

      expect(child.snapshots.count).to eq(1)
      expect(child.snapshot_version).to eq(1)
      expect(child.realtime_snapshot_version_value).to eq(1)
      snapshot = child.snapshots.first

      expect(snapshot.version_meta).to eq({})

      expect(snapshot.snapshot_version).to eq(1)
      expect(snapshot.blocks.count).to eq(0)
      expect(snapshot.blocks.count).to eq(child.descendants.count)
    end

    it 'complex' do
      parent = child.parent
      expect(parent.snapshots.count).to eq(0)
      expect(parent.snapshot_version).to eq(0)
      expect(parent.realtime_snapshot_version_value).to eq(0)

      child_history_version_0 = child.history_version
      parent_history_version_0 = parent.history_version
      child.update!(meta: { 'meta' => 'child first edit' })
      parent.update!(meta: { 'meta' => 'parent first edit' })

      child_history_version_1 = child.history_version
      parent_history_version_1 = parent.history_version

      expect(child_history_version_1).to eq(child_history_version_0 + 1)
      expect(parent_history_version_1).to eq(parent_history_version_0 + 1)

      parent.save_snapshot!

      expect(parent.snapshot_version).to eq(1)
      expect(parent.realtime_snapshot_version_value).to eq(1)
      snapshot = parent.snapshots.first
      expect(snapshot.blocks.count).to eq(2)

      expect(snapshot.blocks.first.history_version).to eq(parent_history_version_1)
      expect(snapshot.blocks.last.history_version).to eq(child_history_version_1)

      child.update!(meta: { 'meta' => 'child second edit' })
      parent.update!(meta: { 'meta' => 'parent second edit' })

      expect(snapshot.blocks.first.history_version).to eq(parent_history_version_1)
      expect(snapshot.blocks.last.history_version).to eq(child_history_version_1)
    end

    it 'restore' do
      block = child.parent
      old_text = block.text
      old_snapshot_version = block.snapshot_version

      block.save_snapshot!
      new_text = 'foo bar'
      block.update!(text: new_text)

      expect(block.snapshot_version).to eq(old_snapshot_version + 1)

      snapshot = described_class.find_by!(block_id: block.id, snapshot_version: block.snapshot_version)
      snapshot.restore!
      block.reload

      expect(block.text).to eq(old_text)
      expect(block.snapshot_version).to eq(old_snapshot_version + 2)
    end
  end
end
