# frozen_string_literal: true

module BrickGraphQL
  class Scalars::Nil < BrickGraphQL::BaseScalar
    description "Null value"

    def self.coerce_input(input_value, _context)
      unless input_value.blank?
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
