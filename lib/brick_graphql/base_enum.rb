# frozen_string_literal: true

module BrickGraphQL
  class BaseEnum < ::GraphQL::Schema::Enum
    class <<self
      def to_h
        values.transform_values(&:value)
      end

      def [](str)
        to_h.fetch str
      end
    end
  end
end
