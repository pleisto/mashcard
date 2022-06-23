# frozen_string_literal: true

module Types
  module Pods
    class MemberRole < BaseEnum
      value 'owner', 'OWNER'
      value 'admin', 'ADMIN'
      value 'member', 'MEMBER'
    end
  end
end
