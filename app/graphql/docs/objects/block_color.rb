# frozen_string_literal: true
module Docs
  module Objects
    class BlockColor < BrickGraphQL::BaseObject
      field :type, Enums::Blocktype, 'type', null: false
      field :color, String, 'string', null: false
    end
  end
end
