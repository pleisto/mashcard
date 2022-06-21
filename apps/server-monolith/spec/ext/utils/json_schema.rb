# frozen_string_literal: true

require 'rails_helper'

describe Mashcard::Utils::JSONSchema do
  describe 'should work' do
    test_schema = <<~JSON
      {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://example.com/product.schema.json",
        "title": "Product",
        "type": "object",
        "properties": {
          "productId": {
            "type": "integer"
          }
        },
        "required": [ "productId" ]
      }
    JSON
    instance = described_class.new(test_schema)
    it 'valid?' do
      expect(instance.valid?({ productId: '123' }.to_json)).to be(false)
      expect(instance.valid?({ productId: 999, name: 'test' }.to_json)).to be(true)
      expect { instance.validation!({ name: 'test' }.to_json) }.not_to raise_error(ArgumentError)
    end
  end
end
