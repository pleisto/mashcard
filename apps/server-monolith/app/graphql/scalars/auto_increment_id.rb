# frozen_string_literal: true

module Scalars
  class AutoIncrementID < BaseScalar
    description 'AutoIncrement Primary Key'

    def self.coerce_input(input_value, _context)
      unless /^[a-z0-9]+$/.match?(input_value)
        raise GraphQL::CoercionError,
          "#{input_value.inspect} is not a valid encrypted auto increment ID"
      end
      Mashcard::Crypto.int_id_deobfuscate(input_value)
    end

    def self.coerce_result(ruby_value, _context)
      Mashcard::Crypto.int_id_obfuscate(ruby_value)
    end
  end
end
