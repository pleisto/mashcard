# frozen_string_literal: true

module BrickGraphQL
  class Scalars::HttpUrl < BrickGraphQL::BaseScalar
    description "A valid http or https url"

    def self.coerce_input(input_value, _context)
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
