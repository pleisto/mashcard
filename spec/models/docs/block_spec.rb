# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::Block, type: :model do
  context '.basic' do
    let(:pod) { create(:pod) }
    let(:block) { create(:docs_block) }
    let(:child) { create(:docs_block_child) }
    let(:attrs) do
      {
        meta: { title: FFaker::Lorem.phrase },
        data: { text: "", content: []	}
      }
    end

    it 'relations' do
      parent = child.parent
      expect(parent.children.ids).to eq([child.id])
      expect(parent.ancestors.count).to eq(1)
      expect(child.ancestors.count).to eq(2)
      expect(parent.ancestors_raw.count).to eq(1)
      expect(child.ancestors_raw.count).to eq(2)
      expect(parent.descendants.count).to eq(2)
      expect(child.descendants.count).to eq(0)
      expect(child.descendants_raw.count).to eq(1)
      expect(child.root_id).to eq(child.parent_id)
      expect(parent.root_id).to eq(parent.id)

      expect(parent.children_version_meta).to eq({ child.id => child.history_version, parent.id => parent.history_version })
    end

    it 'create' do
      params = attrs.merge({ page: true, pod: pod, id: SecureRandom.uuid, collaborators: [pod.owner.id] })
      block = Docs::Block.create!(params)

      expect(block.histories.count).to eq(1)
      expect(block.snapshots.count).to eq(0)
    end

    it 'modify' do
      old_version = block.history_version
      block.update!(meta: { title: "changed title" })
      expect(block.history_version).to eq(old_version + 1)
    end

    it 'order' do
      old_version = block.history_version
      expect(block.sort).to eq(0)
      block.update!(sort: 101)
      expect(block.history_version).to eq(old_version + 1)
    end

    it 'child to child: move same parent' do
      old_version = child.history_version
      child.move!(child.parent_id, 100)
      expect(child.sort).to eq(100)
      expect(child.history_version).to eq(old_version + 1)
      history = child.histories.find_by!(history_version: child.history_version)
      expect(history.parent_id).to eq(child.parent_id)
    end

    it 'child to child: move different parent' do
      old_version = child.history_version
      child.move!(block.id, 200)
      expect(child.sort).to eq(200)
      expect(child.parent_id).to eq(block.id)
      expect(child.history_version).to eq(old_version + 1)
      history = child.histories.find_by!(history_version: child.history_version)
      expect(history.parent_id).to eq(child.parent_id)
    end

    it 'root to root' do
      old_version = block.history_version
      block.move!(nil, 168)
      expect(block.sort).to eq(168)
      expect(block.parent_id).to eq(nil)
      expect(block.history_version).to eq(old_version + 1)
      history = block.histories.find_by!(history_version: block.history_version)
      expect(history.sort).to eq(block.sort)
    end

    it 'error' do
      expect { block.move!(block.id, 171) }.to raise_error(ArgumentError)
      expect { child.parent.move!(child.id, 171) }.to raise_error(ArgumentError)
    end

    it 'root to child' do
      expect(block.type).to eq("doc")
      old_version = block.history_version
      block.move!(child.id, 231)
      expect(block.sort).to eq(231)
      expect(block.parent_id).to eq(child.id)
      expect(block.type).to eq("doc")
      expect(block.history_version).to eq(old_version + 1)
      history = block.histories.find_by!(history_version: block.history_version)
      expect(history.sort).to eq(block.sort)
      expect(history.type).to eq("doc")
      expect(history.parent_id).to eq(block.parent_id)
    end

    it 'child to root' do
      expect(child.type).to eq("doc")
      old_version = child.history_version
      child.move!(nil, 412)
      expect(child.sort).to eq(412)
      expect(child.parent_id).to eq(nil)
      expect(child.type).to eq("doc")
      expect(child.history_version).to eq(old_version + 1)
      history = child.histories.find_by!(history_version: child.history_version)
      expect(history.sort).to eq(child.sort)
      expect(history.type).to eq("doc")
      expect(history.parent_id).to eq(child.parent_id)
    end
  end
end
