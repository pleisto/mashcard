# frozen_string_literal: true

module System
  class Enums::MemberRole < BrickGraphQL::BaseEnum
    value "admin", "ADMIN"
    value "member", "MEMBER"
  end
end
