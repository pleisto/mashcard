# frozen_string_literal: true

module Types
  module Blocks
    class Color < Types::BaseObject
      graphql_name 'BlockColor'
      field :color, String, 'string', null: false
      field :type, BlockType, 'type', null: true
    end
  end
end
