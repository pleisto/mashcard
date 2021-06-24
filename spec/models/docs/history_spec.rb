# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::History, type: :model do
  context '.histories' do
    let(:block) { create(:docs_block) }
    let(:child) { create(:docs_block_child) }

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

    it 'from version meta' do
      parent = child.parent
      parent_history = parent.histories.last

      expect(parent_history.children.count).to eq(2)
      expect(parent_history.history_version).to eq(1)
      expect(child.history_version).to eq(1)

      expect(Docs::History.from_version_meta({ child.id => 1, parent.id => 1 }).count).to eq(2)
    end
  end
end
