# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::Alias, type: :model do
  describe '.basic' do
    let(:block) { create(:docs_block) }

    it 'work' do
      a = block.aliases.create!(alias: 'foo')

      b1, _a1 = Docs::Block.find_by_slug(block.id, block.space.domain)
      expect(b1.id).to eq(block.id)
      expect(nil).to be_nil

      b2, a2 = Docs::Block.find_by_slug('foo', block.space.domain)
      expect(b2.id).to eq(block.id)
      expect(a2.id).to eq(a.id)

      a.disabled!

      b3, a3 = Docs::Block.find_by_slug('foo', block.space.domain)
      expect(b3).to be_nil
      expect(a3).to be_nil

      b4, a4 = Docs::Block.find_by_slug('bar', block.space.domain)
      expect(b4).to be_nil
      expect(a4).to be_nil
    end
  end
end
