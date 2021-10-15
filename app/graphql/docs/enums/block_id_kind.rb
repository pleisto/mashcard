# frozen_string_literal: true

module Docs
  class Enums::BlockIDKind < BrickGraphQL::BaseEnum
    value "p", "NORMAL"
    value "a", "ALIAS"
  end
end
