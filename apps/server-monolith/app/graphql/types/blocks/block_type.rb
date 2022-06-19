# frozen_string_literal: true

module Types
  module Blocks
    class BlockType < BaseEnum
      graphql_name 'BlockType'
      value 'IMAGE', 'IMAGE'
      value 'EMOJI', 'EMOJI'
      value 'COLOR', 'COLOR'
      value 'ATTACHMENT', 'ATTACHMENT'
      value 'PEOPLE', 'PEOPLE'
      value 'PAGE', 'PAGE'
    end
  end
end
