# typed: true
# frozen_string_literal: true

module BrickGraphQL
  module Extensions
    class DefaultValueExtension < GraphQL::Schema::FieldExtension
      def after_resolve(value:, **_rest)
        if value.nil?
          options[:default_value]
        else
          value
        end
      end
    end
  end
end
