# frozen_string_literal: true

module BrickGraphQL
  class ReversibleIntHash
    # implements Knuth's multiplication hashing algorithm
    # @see https://web.archive.org/web/20071223173210/http://www.concentric.net/~Ttwang/tech/inthash.htm
    # and https://github.com/jenssegers/optimus
    attr_accessor :prime, :inverse_integer, :random_integer, :max_integer

    SIZE = 31 # int32
    DEFAULT_SEED = {
      prime: 2130011327,
      inverse_integer: 1941441343,
      random_integer: 1986383814,
    }

    DEFAULT_SEED_WARN = <<-EOF
    The default Reversible int hash seed is being used, which may cause the auto incrementing id to be exposed.
    Please Run `./bin/generate-reversible-int-hash-seed` and set the environment variables according to the result.

    SEE https://phil.tech/2015/auto-incrementing-to-destruction/ for more details.
    EOF

    def initialize(seed = {})
      @prime = seed[:prime]
      @inverse_integer = seed[:inverse_integer]
      @random_integer = seed[:random_integer]
      @max_integer = 2**SIZE - 1
    end

    def encode(value)
      raise ArgumentError, "value #{value} must be less than #{@max_integer}" if value > @max_integer

      (((value * prime) & max_integer) ^ random_integer).to_s(36)
    end

    def decode(value)
      ((value.to_i(36) ^ random_integer) * inverse_integer) & max_integer
    end

    class << self
      def generate_seed
        prime = OpenSSL::BN.generate_prime(SIZE)
        {
          prime: prime.to_i,
          inverse_integer: prime.mod_inverse(2**SIZE).to_i,
          random_integer: OpenSSL::BN.rand(SIZE).to_i,
        }
      end

      delegate :encode, to: :system_instance

      delegate :decode, to: :system_instance

      def system_instance
        @instance ||= if BrickdocConfig.reversible_int_hash[:prime].blank?
          warn DEFAULT_SEED_WARN
          new DEFAULT_SEED
        else
          new BrickdocConfig.reversible_int_hash.transform_values(&:to_i)
        end
      end
    end
  end
end