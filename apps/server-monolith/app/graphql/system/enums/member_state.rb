# frozen_string_literal: true

module System
  module Enums
    class MemberState < BrickGraphQL::BaseEnum
      value 'enabled', 'ENABLED'
      value 'disabled', 'DISABLED'
    end
  end
end
