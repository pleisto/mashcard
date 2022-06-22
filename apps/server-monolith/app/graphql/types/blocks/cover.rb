# frozen_string_literal: true

module Types
  module Blocks
    class Cover < ::GraphQL::Schema::Union
      graphql_name 'BlockCover'
      possible_types Image, Color

      def self.resolve_type(object, _ctx)
        type_class_name = object['type'].downcase.classify
        "Types::Blocks::#{type_class_name}".safe_constantize
      end
    end
  end
end
