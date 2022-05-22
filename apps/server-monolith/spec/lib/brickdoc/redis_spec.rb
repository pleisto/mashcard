# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Redis do
  describe '.version' do
    it 'returns a version' do
      expect(described_class.version).to be_present
    end
  end

  describe '.with_encryption' do
    it 'is encrypted' do
      key = 'cloak_test'
      val = '锟斤拷烫烫烫'
      described_class.with_encryption(:cache) { |r| r.set key, val }
      expect(described_class.with_encryption(:cache) { |r| r.get key }).to eq(val)
      expect(described_class.with(:cache) { |r| r.get key }).to be_nil
    end
  end

  describe '.ping' do
    it 'return pong' do
      described_class::DB_MAPPING.each do |db|
        expect(described_class.with(db, &:ping)).to eq('PONG')
      end
    end
  end

  describe '.object' do
    it 'object counter' do
      class Demo
        include Redis::Objects
        counter :counter
        attr_reader :id

        def initialize(id)
          @id = id
        end
      end

      expect(Demo.new(1).counter).to eq(0)
    end
  end
end
