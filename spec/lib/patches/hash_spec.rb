# frozen_string_literal: true

require 'rails_helper'

describe Patches::Hash do
  context '.unnest' do
    it 'works' do
      expect({ a: { b: 2, c: 3, d: { f: 'x' } }, g: true }.unnest)
        .to eq({ 'a-b' => 2, 'a-c' => 3, 'a-d-f' => 'x', g: true })
    end

    it 'should prefix is #' do
      expect({ x: { y: 1, z: 2 } }.unnest(prefix: '#')).to eq({ 'x#y' => 1, 'x#z' => 2 })
    end
  end
end
