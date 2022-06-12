# frozen_string_literal: true

module Docs
  module Enums
    class Blocktype < BrickGraphQL::BaseEnum
      value 'IMAGE', 'IMAGE'
      value 'EMOJI', 'EMOJI'
      value 'COLOR', 'COLOR'
      value 'ATTACHMENT', 'ATTACHMENT'
      value 'PEOPLE', 'PEOPLE'
      value 'PAGE', 'PAGE'
    end
  end
end
