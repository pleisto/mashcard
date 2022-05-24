# frozen_string_literal: true

require 'rails_helper'

describe Patches::String do
  describe '.to_data_masking' do
    it 'works' do
      expect('PII@mock.com'.to_data_masking).to eq('9f52d913a671a06f1874f3b011e36defc0e9c0af11825e1ee10d7d7e44909deb')
    end
  end
end
