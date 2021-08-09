# frozen_string_literal: true

module Docs
  class Enums::Sharetype < BrickGraphQL::BaseEnum
    value "POD", "POD"
    value "USER", "USER"
    value "EVERYONE", "EVERYONE"
    value "ANONYMOUS", "ANONYMOUS"
  end
end
