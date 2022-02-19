# frozen_string_literal: true

module Docs
  class Enums::Sharetype < BrickGraphQL::BaseEnum
    value "SPACE", "SPACE"
    value "USER", "USER"
    value "EVERYONE", "EVERYONE"
    value "ANONYMOUS", "ANONYMOUS"
  end
end
