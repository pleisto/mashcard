# frozen_string_literal: true

# rubocop:disable RSpec/IdenticalEqualityAssertion
require 'rails_helper'

describe Brickdoc::Crypto do
  it 'integer id could be obfuscated' do
    test_vec = [rand(1...9223372036854775807), 2147483647, 1, 9223372036854775807]
    test_vec.each do |id|
      obfuscated_id = described_class.int_id_obfuscate(id)
      expect(obfuscated_id).to be_a(String)
      expect(described_class.int_id_deobfuscate(obfuscated_id)).to eq(id)
    end
  end

  it 'generic hash should work' do
    str = SecureRandom.hex
    assert = described_class.generic_hash('example')
    expect(assert).to eq('9796546c64ab15ab7468b479f3b3c20d5840af05ac0f999ad7a089512d01572e')
    assert = described_class.generic_hash('W', '9e85f68e3850f9a65d97c1033e4fb207b611b78e9bf75cfd229d00cb55a520c0')
    expect(assert).to eq('3a304f3bf80926111731dc298ac0feedc7fdc9f1ff1a04804bf07096e01b73ac')
    expect(described_class.generic_hash(str)).to eq(described_class.generic_hash(str))
    expect(described_class.generic_hash(str, str)).to eq(described_class.generic_hash(str, str))
    expect(described_class.generic_hash(str)).not_to eq(described_class.generic_hash(str, str))
    expect(described_class.derive_key(:hash_salt)).to eq(described_class.derive_key(:hash_salt))
    expect(described_class.derive_key(:hash_salt)).not_to eq(described_class.derive_key(:hash_salt, str))
    expect(described_class.data_masking(str)).not_to eq(str)
  end
end
