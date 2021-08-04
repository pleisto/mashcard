# frozen_string_literal: true
module Docs
  module Objects
    class BlockEmoji < BrickGraphQL::BaseObject
      field :type, Enums::Blocktype, 'type', null: false
      field :name, String, 'name', null: false
      field :emoji, String, 'emoji', null: false
    end
  end
end
