# frozen_string_literal: true

module Docs
  class Enums::ShareLinkStateType < BrickGraphQL::BaseEnum
    value "enabled", "ENABLED"
    value "disabled", "DISABLED"
  end
end
