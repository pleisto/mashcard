# frozen_string_literal: true

require 'rails_helper'

describe Patches::String do
  describe '.to_data_masking' do
    it 'works' do
      expect('PII@mock.com'.to_data_masking).to eq('84ab731185849a752696797894779e2edeeeb27a8db80e63d4023133455b9fc2')
    end
  end
end
