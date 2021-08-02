# frozen_string_literal: true
module Docs
  module Objects
    class BlockCover < ::GraphQL::Schema::Union
      possible_types BlockImage, BlockColor
    end
  end
end
