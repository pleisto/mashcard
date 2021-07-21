# frozen_string_literal: true

module Docs
  class Enums::Patchstate < BrickGraphQL::BaseEnum
    value "DELETED", "DELETED"
    value "ACTIVE", "ACTIVE"
    value "SUBSCRIBED", "SUBSCRIBED"
  end
end
