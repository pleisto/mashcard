# frozen_string_literal: true

module BrickGraphQL
  module Scalars
    class HttpUrl < BrickGraphQL::BaseScalar
      description 'A valid http/https url or image uri'

      def self.coerce_input(input_value, _context)
        # support Base64 data URI
        return input_value if input_value.start_with?('data:image/')

        # Parse the incoming object into a `URI`
        url = URI.parse(input_value)
        if url.is_a?(URI::HTTP) || url.is_a?(URI::HTTPS)
          # It's valid, return the URI object
          url
        else
          raise GraphQL::CoercionError, "#{input_value.inspect} is not a valid URL"
        end
      end

      def self.coerce_result(ruby_value, _context)
        # It's transported as a string, so stringify it
        ruby_value.to_s
      end
    end
  end
end
