# frozen_string_literal: true
module Docs
  module Objects
    class BlockCover < BrickGraphQL::BaseUnion
      possible_types BlockImage, BlockColor

      def self.resolve_type(object, _ctx)
        type_name = "block_#{object['type'].downcase}".classify
        "Docs::Objects::#{type_name}".safe_constantize
      end
    end
  end
end
