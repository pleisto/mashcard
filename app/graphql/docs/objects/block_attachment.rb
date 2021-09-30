# frozen_string_literal: true
module Docs
  module Objects
    class BlockAttachment < BrickGraphQL::BaseObject
      field :type, Enums::Blocktype, 'type', null: false
      field :source, Enums::Filesourcetype, 'source', null: true
      field :key, String, 'url or blob key', null: true
      field :height, Int, 'height', null: true
      field :width, Int, 'width', null: true
      field :name, String, "name", null: true
      field :size, Int, "size", null: true
    end
  end
end
