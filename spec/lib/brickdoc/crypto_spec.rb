# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Crypto do
  context 'root_key' do
    it 'works' do
      expect(Brickdoc::Crypto.root_key).to eq('84da0814af4152e27229f6fe067b15aecea83f597c1cdee002afd1635b138b4e')
    end
  end

  context 'derive_key' do
    it 'works' do
      expect(Brickdoc::Crypto.derive_key(:rails_master_key)).to eq('856f5453ce144ddcb77875bf45b207241dedbb45342d0ab9fd348f5d40a1cd37')
    end
  end
end
