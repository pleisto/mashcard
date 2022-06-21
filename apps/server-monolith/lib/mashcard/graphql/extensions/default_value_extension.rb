# frozen_string_literal: true

module Mashcard
  module GraphQL
    module Extensions
      # Add default value support to GraphQL schema fields.
      class DefaultValueExtension < ::GraphQL::Schema::FieldExtension
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
end
