# typed: strict
# frozen_string_literal: true

module System
  module Enums
    class UploadType < BrickGraphQL::BaseEnum
      description 'Upload types'

      value 'AVATAR', 'Account avatar'
      value 'DOC', 'Page block'
      value 'THIRD', 'Third'
    end
  end
end
