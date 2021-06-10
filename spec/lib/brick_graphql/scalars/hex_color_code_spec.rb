# frozen_string_literal: true

require 'rails_helper'

describe BrickGraphQL::Scalars::HexColorCode do
  subject { BrickGraphQL::Scalars::HexColorCode }

  it 'invalid hex color code should be raise error' do
    expect { subject.coerce_input('#333F', nil) }.to raise_error(GraphQL::CoercionError)
    expect { subject.coerce_input('#FFF33H', nil) }.to raise_error(GraphQL::CoercionError)
  end

  it 'correct hex code should be work' do
    code = "##{FFaker::Color.hex_code}"
    expect { subject.coerce_input(code, nil) }.not_to raise_error
  end
end
