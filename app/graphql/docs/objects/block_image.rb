# frozen_string_literal: true
module Docs
  module Objects
    class BlockImage < BlockAttachment
      field :key, String, "key", null: false
      field :type, Enums::Blocktype, "type", null: false
      field :source, Enums::Filesourcetype, "type", null: false
      field :height, String, "height", null: true
      field :height, String, "height", null: true
      field :ratio, Float, 'aspect ratio', null: true
    end
  end
end
