# frozen_string_literal: true

module Docs
  module Enums
    class ShareLinkStateType < BrickGraphQL::BaseEnum
      value 'enabled', 'ENABLED'
      value 'disabled', 'DISABLED'
    end
  end
end
