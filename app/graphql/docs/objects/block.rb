# frozen_string_literal: true
module Docs
  module Objects
    class Block < Objects::BlockBaseObject
      graphql_name 'block'
      description 'Brickdoc Docs::Block'
      # possible_types PageBlock, ParagraphBlock

      # TYPE_FALLBACK_MAP = {
      #   "doc" => "page"
      # }

      # def self.resolve_type(object, _ctx)
      #   type_name = "#{TYPE_FALLBACK_MAP[object.type] || 'paragraph'}_block".classify
      #   "Docs::Objects::#{type_name}".safe_constantize
      # end

      field :data, BlockData, null: false
      field :meta, BlockMeta, null: false
    end
  end
end
