# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class BlockColor < BrickGraphQL::BaseObject
      field :color, String, 'string', null: false
      field :type, Enums::Blocktype, 'type', null: true
    end
  end
end
