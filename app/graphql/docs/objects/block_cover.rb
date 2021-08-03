# frozen_string_literal: true
module Docs
  module Objects
    class BlockCover < BrickGraphQL::BaseUnion
      possible_types BlockImage, BlockColor
    end
  end
end
