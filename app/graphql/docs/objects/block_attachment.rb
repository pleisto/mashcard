# frozen_string_literal: true
module Docs
  module Objects
    class BlockAttachment < BrickGraphQL::BaseObject
      field :type, Enums::Blocktype, 'type', null: false
      field :source, Enums::Filesourcetype, 'type', null: false
      field :key, String, 'url or blob key', null: false
      field :height, String, 'width', null: true
      field :width, String, 'height', null: true
    end
  end
end
