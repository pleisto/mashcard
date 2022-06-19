# frozen_string_literal: true

module Types
  module Blocks
    class Icon < ::GraphQL::Schema::Union
      graphql_name 'BlockIcon'
      possible_types Image, Emoji

      def self.resolve_type(object, _ctx)
        type_name = "block_#{object['type'].downcase}".classify
        "Types::#{type_name}".safe_constantize
      end
    end
  end
end
