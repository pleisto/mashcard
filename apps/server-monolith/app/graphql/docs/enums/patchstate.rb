# frozen_string_literal: true

module Docs
  module Enums
    class Patchstate < BrickGraphQL::BaseEnum
      value 'DELETED', 'DELETED'
      value 'ACTIVE', 'ACTIVE'
      value 'SUBSCRIBED', 'SUBSCRIBED'
    end
  end
end
