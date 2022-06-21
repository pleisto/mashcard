# frozen_string_literal: true

module Scalars
  class UUID < BaseScalar
    description 'UUID V4'

    def self.coerce_input(input_value, _context)
      unless Mashcard::Validators::UUIDValidator::REGEXP.match?(input_value)
        raise GraphQL::CoercionError,
          "#{input_value.inspect} is not a valid uuid"
      end
      input_value
    end

    def self.coerce_result(ruby_value, _context)
      # It's transported as a string, so stringify it
      ruby_value.to_s
    end
  end
end
