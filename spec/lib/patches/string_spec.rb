# frozen_string_literal: true

require 'rails_helper'

describe Patches::String do
  context '.to_data_masking' do
    it 'works' do
      expect('PII@mock.com'.to_data_masking).to eq('7159567cfe742317a876f88276a8803dbc96d1ee28b1171e954d2a310741355e')
    end
  end
end
