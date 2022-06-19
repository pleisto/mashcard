# frozen_string_literal: true

module Scalars
  class Nil < BaseScalar
    description 'Null value'

    def self.coerce_input(input_value, _context)
      if input_value.present?
        raise GraphQL::CoercionError,
          "#{input_value.inspect} should be blank"
      end
      input_value
    end

    def self.coerce_result(_ruby_value, _context)
      nil
    end
  end
end
