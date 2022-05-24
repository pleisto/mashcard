# frozen_string_literal: true

module BrickGraphQL
  module Scalars
    class HexColorCode < BrickGraphQL::BaseScalar
      description 'Hex Color Code'
      REGEXP = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i

      def self.coerce_input(input_value, _context)
        raise GraphQL::CoercionError,
          "#{input_value.inspect} is not a valid Hex Color Code" unless REGEXP.match?(input_value)
        input_value
      end

      def self.coerce_result(ruby_value, _context)
        # It's transported as a string, so stringify it
        ruby_value.to_s
      end
    end
  end
end
