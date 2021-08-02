# frozen_string_literal: true
module Docs
  module Objects
    class BlockIcon < ::GraphQL::Schema::Union
      possible_types BlockImage, BlockEmoji
    end
  end
end
