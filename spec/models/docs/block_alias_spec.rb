# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::Alias, type: :model do
  context '.basic' do
    let(:block) { create(:docs_block) }

    it 'work' do
      a = block.aliases.create!(alias: "foo")

      b1, _a1 = Docs::Block.find_by_slug(block.id, block.space.domain)
      expect(b1.id).to eq(block.id)
      expect(nil).to eq(nil)

      b2, a2 = Docs::Block.find_by_slug("foo", block.space.domain)
      expect(b2.id).to eq(block.id)
      expect(a2.id).to eq(a.id)

      a.disabled!

      b3, a3 = Docs::Block.find_by_slug("foo", block.space.domain)
      expect(b3).to eq(nil)
      expect(a3).to eq(nil)

      b4, a4 = Docs::Block.find_by_slug("bar", block.space.domain)
      expect(b4).to eq(nil)
      expect(a4).to eq(nil)
    end
  end
end
