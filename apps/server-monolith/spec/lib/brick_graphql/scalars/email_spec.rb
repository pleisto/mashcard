# frozen_string_literal: true

require 'rails_helper'

describe BrickGraphQL::Scalars::Email do
  subject { described_class }

  it 'invalid email address should be raise error' do
    expect { subject.coerce_input('test.local', nil) }.to raise_error(GraphQL::CoercionError)
  end

  it 'correct email address should be work' do
    code = FFaker::Internet.email.to_s
    expect { subject.coerce_input(code, nil) }.not_to raise_error
  end
end
