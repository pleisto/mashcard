# frozen_string_literal: true

module Types
  module Blocks
    class Emoji < Types::BaseObject
      graphql_name 'BlockEmoji'
      field :emoji, String, 'emoji', null: false
      field :name, String, 'name', null: false
      field :type, BlockType, 'type', null: true
    end
  end
end
