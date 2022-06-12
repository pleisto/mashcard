# frozen_string_literal: true

require 'benchmark/ips'
require 'securerandom'

require_relative '../../lib/brickdoc_ext'
require_relative '../../lib/brickdoc/native_extension_helper'

#
# Result in M1==>
#
# Warming up --------------------------------------
#          stdlib uuid    78.481k i/100ms
#   rust extesion uuid   370.091k i/100ms
# Calculating -------------------------------------
#          stdlib uuid    784.985k (± 0.8%) i/s -      7.927M in  10.098331s
#   rust extesion uuid      3.673M (± 0.6%) i/s -     37.009M in  10.077170s
#

FUUID = Brickdoc::Utils::Encoding::UUID

Benchmark.ips do |x|
  x.config(time: 10, warmup: 2)

  x.report('stdlib uuid') do
    SecureRandom.uuid
  end

  x.report('rust extesion uuid') do
    FUUID.gen_v4
  end
end
