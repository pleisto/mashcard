# frozen_string_literal: true

module Docs
  class Enums::Blocktype < BrickGraphQL::BaseEnum
    value "IMAGE", "IMAGE"
    value "EMOJI", "EMOJI"
    value "COLOR", "COLOR"
    value "ATTACHMENT", "ATTACHMENT"
  end
end
