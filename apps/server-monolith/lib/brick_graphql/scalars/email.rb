# typed: true
# frozen_string_literal: true

module BrickGraphQL
  module Scalars
    class Email < BrickGraphQL::BaseScalar
      description 'Email Address'

      def self.coerce_input(input_value, _context)
        unless input_value =~ Brickdoc::Validators::EmailValidator::REGEXP
          raise GraphQL::CoercionError,
            "#{input_value.inspect} is not a valid email address"
        end
        input_value
      end

      def self.coerce_result(ruby_value, _context)
        # It's transported as a string, so stringify it
        ruby_value.to_s
      end
    end
  end
end
