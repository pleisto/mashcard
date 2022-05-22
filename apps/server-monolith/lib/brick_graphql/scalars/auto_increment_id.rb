# typed: true
# frozen_string_literal: true

module BrickGraphQL
  module Scalars
    class AutoIncrementID < BrickGraphQL::BaseScalar
      description 'AutoIncrement Primary Key'

      def self.coerce_input(input_value, _context)
        unless input_value =~ /^[a-z0-9]+$/
          raise GraphQL::CoercionError,
            "#{input_value.inspect} is not a valid encrypted auto increment ID"
        end
        ReversibleIntHash.decode input_value
      end

      def self.coerce_result(ruby_value, _context)
        ReversibleIntHash.encode ruby_value
      end
    end
  end
end
