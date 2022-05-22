# typed: strict
# frozen_string_literal: true

module System
  module Enums
    class MemberRole < BrickGraphQL::BaseEnum
      value 'admin', 'ADMIN'
      value 'member', 'MEMBER'
    end
  end
end
