# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::History, type: :model do
  describe '.histories' do
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
      expect(block.realtime_history_version_value).to eq(old_version + 1)
      expect(history.history_version).to eq(old_version + 1)
      expect(history.meta).to eq(block.meta)
      expect(history.data).to eq(block.data)
      expect(history.content).to eq(block.content)
      expect(history.text).to eq(block.text)
      expect(block.histories.count).to eq(old_hist_count + 1)
    end

    it 'from version meta' do
      parent = child.parent
      parent_history = parent.histories.last

      expect(parent_history.history_version).to eq(1)
      expect(child.history_version).to eq(1)
      expect(child.realtime_history_version_value).to eq(1)

      expect(described_class.from_version_meta({ child.id => 1, parent.id => 1 }).count).to eq(2)
    end
  end
end
