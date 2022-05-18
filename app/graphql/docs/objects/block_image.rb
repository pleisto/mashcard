# frozen_string_literal: true
module Docs
  module Objects
    class BlockImage < BlockAttachment
      field :key, String, "key", null: true
      field :displayName, String, 'display name', null: true
      field :type, Enums::Blocktype, "type", null: true
      field :source, Enums::Filesourcetype, "type", null: true
      field :height, Int, "height", null: true
      field :width, Int, "width", null: true
      field :ratio, Float, 'aspect ratio', null: true
      field :name, String, "name", null: true
      field :size, Int, "size", null: true
      field :mode, String, "mode", null: true
      field :align, String, "align", null: true
    end
  end
end
