# frozen_string_literal: true
module Docs
  module Objects
    class BlockIcon < BrickGraphQL::BaseUnion
      possible_types BlockImage, BlockEmoji

      def self.resolve_type(object, _ctx)
        type_name = "block_#{object['type'].downcase}".classify
        "Docs::Objects::#{type_name}".safe_constantize
      end
    end
  end
end
