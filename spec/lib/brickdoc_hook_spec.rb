# frozen_string_literal: true

require 'rails_helper'

describe BrickdocHook do
  it 'can on and off hook' do
    test_block = proc do
    end
    BrickdocHook.on :test, &test_block
    BrickdocHook.on :test do
    end
    BrickdocHook.on :test do
    end
    BrickdocHook.on :test, scope: 'plugin.test' do
    end

    expect(BrickdocHook.hooks[:test].length).to eq(4)

    BrickdocHook.off :test, scope: 'plugin.test'
    expect(BrickdocHook.hooks[:test].length).to eq(3)

    BrickdocHook.off :test, &test_block
    expect(BrickdocHook.hooks[:test].length).to eq(2)

    BrickdocHook.off :test
    expect(BrickdocHook.hooks[:test].length).to eq(0)
  end

  it 'can trigger hook' do
    v = { i: 0 }

    BrickdocHook.on :hook1, scope: 'plugin1' do |a|
      a[:i] |= 0b01
    end
    BrickdocHook.on :hook1, scope: 'plugin2' do |a|
      a[:i] |= 0b10
    end

    BrickdocHook.trigger :hook1, v
    expect(v[:i]).to eq(0b00)

    BrickdocHook.enabled_scopes = ['plugin1']

    BrickdocHook.trigger :hook1, v
    expect(v[:i]).to eq(0b01)

    v[:i] = 0

    BrickdocHook.enabled_scopes = ['plugin1', 'plugin2']

    BrickdocHook.trigger :hook1, v
    expect(v[:i]).to eq(0b11)
  end

  it 'can eval_with for DSL-style hook' do
    BrickdocHook.on :dsl_hook, scope: 'plugin3' do
      push 'new'
    end

    BrickdocHook.enabled_scopes = ['plugin3']

    arr = ['old']

    BrickdocHook.eval_with :dsl_hook, arr
    expect(arr).to eq(['old', 'new'])
  end
end
