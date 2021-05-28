# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Redis do
  context '.version' do
    it 'returns a version' do
      expect(described_class.version).to be_present
    end
  end

  context '.with_encryption' do
    it 'should be encrypted' do
      key = 'cloak_test'
      val = '锟斤拷烫烫烫'
      described_class.with_encryption(:cache) { |r| r.set key, val }
      expect(described_class.with_encryption(:cache) { |r| r.get key }).to eq(val)
      expect(described_class.with(:cache) { |r| r.get key }).to be_nil
    end
  end
end
