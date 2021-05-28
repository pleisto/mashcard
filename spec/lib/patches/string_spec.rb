# frozen_string_literal: true

require 'rails_helper'

describe Patches::String do
  context '.to_data_masking' do
    it 'works' do
      expect('PII@mock.com'.to_data_masking).to eq('gdpr-gyijtfp192op')
    end
  end
end
