# frozen_string_literal: true

require 'rails_helper'

describe BrickdocHook do
  it 'can on and off hook' do
    test_block = proc do
    end
    described_class.on :test, &test_block
    described_class.on :test do
    end
    described_class.on :test do
    end
    described_class.on :test, namespace: 'plugin.test' do
    end

    expect(described_class.hooks[:test].length).to eq(4)

    described_class.off :test, namespace: 'plugin.test'
    expect(described_class.hooks[:test].length).to eq(3)

    described_class.off :test, &test_block
    expect(described_class.hooks[:test].length).to eq(2)

    described_class.off :test
    expect(described_class.hooks[:test].length).to eq(0)
  end

  it 'can trigger hook' do
    v = { i: 0 }

    described_class.on :hook1, namespace: 'plugin1' do |a|
      a[:i] |= 0b01
    end
    described_class.on :hook1, namespace: 'plugin2' do |a|
      a[:i] |= 0b10
    end

    described_class.trigger :hook1, v
    expect(v[:i]).to eq(0b00)

    described_class.enabled_namespaces = ['plugin1']

    described_class.trigger :hook1, v
    expect(v[:i]).to eq(0b01)

    v[:i] = 0

    described_class.enabled_namespaces = ['plugin1', 'plugin2']

    described_class.trigger :hook1, v
    expect(v[:i]).to eq(0b11)
  end

  it 'can eval_with for DSL-style hook' do
    described_class.on :dsl_hook, namespace: 'plugin3' do
      push 'new'
    end

    described_class.enabled_namespaces = ['plugin3']

    arr = ['old']

    described_class.eval_with :dsl_hook, arr
    expect(arr).to eq(['old', 'new'])
  end
end
