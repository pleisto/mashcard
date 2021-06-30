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
        data: { paragraphs: FFaker::DizzleIpsum.paragraphs	}
      }
    end

    it 'relations' do
      parent = child.parent
      expect(parent.children.ids).to eq([child.id])
      expect(parent.ancestors.count).to eq(1)
      expect(child.ancestors.count).to eq(2)
      expect(parent.descendants.count).to eq(2)
      expect(child.descendants.count).to eq(1)

      expect(parent.path_cache).to eq([parent.id])
      expect(child.path_cache).to eq([child.id, parent.id])
      expect(child.children_version_meta).to eq({ child.id => child.history_version })
      expect(parent.children_version_meta).to eq({ child.id => child.history_version, parent.id => parent.history_version })
    end

    it 'create' do
      params = attrs.merge({ pod: pod, collaborators: [pod.owner.id] })
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
  end
end
