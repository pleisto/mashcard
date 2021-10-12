# frozen_string_literal: true

module System
  class Enums::MemberState < BrickGraphQL::BaseEnum
    value "enabled", "ENABLED"
    value "disabled", "DISABLED"
  end
end
