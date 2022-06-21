# frozen_string_literal: true

require 'rails_helper'
require 'base64'

describe Mashcard::Utils::Encoding do
  describe 'should base58 work' do
    Base58 = Mashcard::Utils::Encoding::Base58
    it 'base58 could encode' do
      plain = 'Life, Liberty and the pursuit of Happiness'
      expect(Base58.encode(plain)).to eq('2Gy1vRdFjrFi6PLggkXF8dnRB4VmzHTm8XdtRiWPWEg9qKKUWA5jQkusb8')
    end

    it 'base58 could decode' do
      expect(Base58.decode('')).to eq('')
      expect(Base58.decode('5Wtrei9W2gkKxqwXHS7T7RdZT7vo5')).to eq('Intelligence Argument')
    end

    it 'base58 could self-consistent' do
      binary = Random.new.bytes(32)
      pararaph = FFaker::Lorem.paragraph
      expect(Base58.decode(Base58.encode(pararaph))).to eq(pararaph)
      expect(Base58.decode(Base58.encode(binary))).to eq(binary)
    end
  end

  describe 'should base64 work' do
    B64 = Mashcard::Utils::Encoding::Base64
    binary = Random.new.bytes(131)
    pararaph = FFaker::Lorem.paragraph

    it 'base64 rfc4648 should work' do
      expect(B64.strict_encode64(pararaph)).to eq(Base64.strict_encode64(pararaph))
      expect(B64.strict_encode64(binary)).to eq(Base64.strict_encode64(binary))
      expect(B64.strict_encode64('foobar')).to eq('Zm9vYmFy')
      expect(B64.strict_decode64(B64.strict_encode64(binary))).to eq(binary)
      expect(B64.strict_decode64(B64.strict_encode64(pararaph))).to eq(pararaph)
      expect { B64.strict_decode64('!3#-$😃}') }.to raise_error(ArgumentError)
    end

    it 'base64 urlsafe should work' do
      expect(B64.urlsafe_encode64(pararaph)).to eq(Base64.urlsafe_encode64(pararaph))
      expect(B64.urlsafe_encode64(binary)).to eq(Base64.urlsafe_encode64(binary))
      expect(B64.urlsafe_encode64(pararaph, padding: false)).to eq(Base64.urlsafe_encode64(pararaph, padding: false))
      expect(B64.urlsafe_encode64(binary, padding: false)).to eq(Base64.urlsafe_encode64(binary, padding: false))
      expect(B64.urlsafe_decode64(B64.urlsafe_encode64(binary))).to eq(binary)
      expect(B64.urlsafe_decode64(B64.urlsafe_encode64(pararaph))).to eq(pararaph)
      assert = 'support ukraine!'
      expect(B64.urlsafe_decode64('c3VwcG9ydCB1a3JhaW5lIQ==')).to eq(assert)
      expect(B64.urlsafe_decode64('c3VwcG9ydCB1a3JhaW5lIQ')).to eq(assert)
    end
  end

  it 'z85 work' do
    Z85 = Mashcard::Utils::Encoding::Z85
    plain = 'Life, Liberty and the pursuit of Happiness'
    expect(Z85.encode(plain)).to eq('oLF9IefES2vR6O4C{3Kkwft#cwGU@mA=VwqBrCHlav]{WAa%i3##47Y')
    binary = Random.new.bytes(64)
    expect(Z85.decode(Z85.encode(binary))).to eq(binary)
  end

  it 'uuid work' do
    UUID = Mashcard::Utils::Encoding::UUID
    expect(UUID.gen_v4).to match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(UUID.gen_short).not_to be_empty
    assert = UUID.gen_v4
    expect(UUID.expand(UUID.shorten(assert))).to eq(assert)
  end
end
