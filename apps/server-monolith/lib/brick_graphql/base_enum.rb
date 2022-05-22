# typed: true
# frozen_string_literal: true

module BrickGraphQL
  class BaseEnum < ::GraphQL::Schema::Enum
    class << self
      def to_h
        values.transform_values(&:value)
      end

      def [](str)
        to_h.fetch str
      end

      # Helper to define an enum member for each element of a Rails AR enum
      def from_rails_enum(enum, description:)
        enum.each_key do |name|
          value name.to_s.upcase,
            value: name,
            description: format(description, name: name)
        end
      end

      # Returns an indifferent access hash with the key being the downcased name of the attribute
      # and the value being the Ruby value (either the explicit `value` passed or the same as the value attr).
      def enum
        @enum_values ||= {}.with_indifferent_access
      end
    end
  end
end
