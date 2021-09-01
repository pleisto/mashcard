# frozen_string_literal: true
module Docs
  module Objects
    class BlockAttachment < BrickGraphQL::BaseObject
      field :type, Enums::Blocktype, 'type', null: false
      field :source, Enums::Filesourcetype, 'type', null: false
      field :key, String, 'url or blob key', null: false
      field :height, Int, 'height', null: true
      field :width, Int, 'width', null: true
    end
  end
end
