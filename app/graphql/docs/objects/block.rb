# frozen_string_literal: true
module Docs
  module Objects
    class Block < ::GraphQL::Schema::Union
      graphql_name 'block'
      description 'Brickdoc Docs::Block'
      possible_types PageBlock, TextBlock, MetaBlock, ParagraphBlock

      TYPE_FALLBACK_MAP = {
        "doc" => "page",
        "paragraph" => "paragraph",
        "text" => "text"
      }

      def self.resolve_type(object, _ctx)
        type_name = "#{TYPE_FALLBACK_MAP[object.type] || 'meta'}_block".classify
        "Docs::Objects::#{type_name}".safe_constantize
      end
    end
  end
end
