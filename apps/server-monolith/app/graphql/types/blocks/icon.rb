# frozen_string_literal: true

module Types
  module Blocks
    class Icon < ::GraphQL::Schema::Union
      graphql_name 'BlockIcon'
      possible_types Image, Emoji

      def self.resolve_type(object, _ctx)
        # object['type] == 'EMOJI'
        # type_class_name = 'Emoji'
        type_class_name = object['type'].downcase.classify.classify
        "Types::Blocks::#{type_class_name}".safe_constantize
      end
    end
  end
end
