# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::Block, type: :model do
  context '.create block' do
    let(:block) { create(:docs_block) }

    it 'basic' do
      expect(block.pod.owner.id).to eq(block.collaborators.first)
    end
  end

  context '.histories' do
    let(:block) { create(:docs_block) }

    it 'automatic save' do
      old_version = block.history_version
      old_hist_count = block.histories.count

      expect(block.histories.last.history_version).to eq(old_version)
      expect(block.histories.last.meta).to eq(block.meta)

      block.update!(meta: block.meta.merge('changed' => true))

      history = block.histories.last
      expect(block.history_version).to eq(old_version + 1)
      expect(history.history_version).to eq(old_version + 1)
      expect(history.meta).to eq(block.meta)
      expect(history.path).to eq([block.id])
      expect(block.histories.count).to eq(old_hist_count + 1)
    end
  end

  context '.snapshots' do
    let(:child) { create(:docs_block_child) }

    it 'basic' do
      expect(child.parent_id).not_to be_nil
      expect(child.snapshots.count).to eq(0)
      expect(child.snapshot_version).to eq(0)

      child.save_snapshot!

      expect(child.snapshots.count).to eq(1)
      expect(child.snapshot_version).to eq(1)
      snapshot = child.snapshots.first

      expect(snapshot.snapshot_version).to eq(1)
      expect(snapshot.blocks.count).to eq(1)
      # hist = snapshot.blocks.first
      expect(snapshot.blocks.count).to eq(child.descendants.count)
      # expect(snapshot.blocks.count).to be > 1
    end

    it 'complex' do
      parent = child.parent
      expect(parent.snapshots.count).to eq(0)
      expect(parent.snapshot_version).to eq(0)

      child_history_version_0 = child.history_version
      parent_history_version_0 = parent.history_version
      child.update!(meta: { "meta" => "child first edit" })
      parent.update!(meta: { "meta" => "parent first edit" })

      child_history_version_1 = child.history_version
      parent_history_version_1 = parent.history_version

      expect(child_history_version_1).to eq(child_history_version_0 + 1)
      expect(parent_history_version_1).to eq(parent_history_version_0 + 1)

      parent.save_snapshot!

      expect(parent.snapshot_version).to eq(1)
      snapshot = parent.snapshots.first
      expect(snapshot.blocks.count).to eq(2)

      expect(snapshot.blocks.first.history_version).to eq(parent_history_version_1)
      expect(snapshot.blocks.last.history_version).to eq(child_history_version_1)

      child.update!(meta: { "meta" => "child second edit" })
      parent.update!(meta: { "meta" => "parent second edit" })

      expect(snapshot.blocks.first.history_version).to eq(parent_history_version_1)
      expect(snapshot.blocks.last.history_version).to eq(child_history_version_1)
    end
  end
end
