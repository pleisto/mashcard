# frozen_string_literal: true

require 'benchmark/ips'

require 'base64'
require 'ffaker'
require_relative '../../lib/mashcard_ext'
require_relative '../../lib/mashcard/native_extension_helper'

small_bytes = Random.new.bytes(32)
medium_bytes = Random.new.bytes(2048)
large_bytes = Random.new.bytes(1024 * 1024 * 2) # 2MB
string = FFaker::Lorem.paragraph
B64 = Mashcard::Utils::Encoding::Base64

#
# Result in M1==>
#
# Warming up --------------------------------------
#        stdlib base64     8.000  i/100ms
# rust extesion base64    15.000  i/100ms
# Calculating -------------------------------------
#        stdlib base64     86.285  (± 2.3%) i/s -    864.000  in  10.017358s
# rust extesion base64    173.655  (± 5.2%) i/s -      1.740k in  10.048637s
#

Benchmark.ips do |x|
  x.config(time: 10, warmup: 2)

  x.report('stdlib base64') do
    Base64.strict_decode64(Base64.strict_encode64(small_bytes))
    Base64.strict_decode64(Base64.strict_encode64(medium_bytes))
    Base64.strict_decode64(Base64.strict_encode64(large_bytes))
    Base64.strict_decode64(Base64.strict_encode64(string))
    Base64.urlsafe_decode64(Base64.urlsafe_encode64(small_bytes, padding: true))
    Base64.urlsafe_decode64(Base64.urlsafe_encode64(medium_bytes, padding: true))
    Base64.urlsafe_decode64(Base64.urlsafe_encode64(large_bytes, padding: false))
    Base64.urlsafe_decode64(Base64.urlsafe_encode64(string, padding: false))
  end

  x.report('rust extesion base64') do
    B64.strict_decode64(B64.strict_encode64(small_bytes))
    B64.strict_decode64(B64.strict_encode64(medium_bytes))
    B64.strict_decode64(B64.strict_encode64(large_bytes))
    B64.strict_decode64(B64.strict_encode64(string))
    B64.urlsafe_decode64(B64.urlsafe_encode64(small_bytes, padding: true))
    B64.urlsafe_decode64(B64.urlsafe_encode64(medium_bytes, padding: true))
    B64.urlsafe_decode64(B64.urlsafe_encode64(large_bytes, padding: false))
    B64.urlsafe_decode64(B64.urlsafe_encode64(string, padding: false))
  end
end
