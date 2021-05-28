# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc do
  context '.root' do
    it 'returns the root path same as Rails' do
      expect(described_class.root).to eq(Rails.root)
    end
  end

  context '.saas?' do
    it 'works' do
      Brickdoc::SaaS = Module.new unless Module.const_defined?('Brickdoc::SaaS')
      expect(described_class.saas?).to be_truthy
      expect(described_class.self_hosted?).to be_falsey
    end
  end
end
