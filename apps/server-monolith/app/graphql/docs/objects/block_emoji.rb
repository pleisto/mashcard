# frozen_string_literal: true

module Docs
  module Objects
    class BlockEmoji < BrickGraphQL::BaseObject
      field :emoji, String, 'emoji', null: false
      field :name, String, 'name', null: false
      field :type, Enums::Blocktype, 'type', null: true
    end
  end
end
