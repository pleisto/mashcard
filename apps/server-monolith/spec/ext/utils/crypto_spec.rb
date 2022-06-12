# frozen_string_literal: true

require 'rails_helper'
require 'securerandom'
describe Brickdoc::Utils::Crypto do
  it 'argon2id should work' do
    pwd = FFaker::Internet.password
    hashed = described_class::Argon2id.hash_password(pwd)
    expect(described_class::Argon2id.verify_password(hashed, pwd)).to be_truthy
    expect(described_class::Argon2id.verify_password(hashed, "wrong:#{pwd}")).to be_falsey
  end
end
