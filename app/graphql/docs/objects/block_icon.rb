# frozen_string_literal: true
module Docs
  module Objects
    class BlockIcon < BrickGraphQL::BaseUnion
      possible_types BlockImage, BlockEmoji
    end
  end
end
