# frozen_string_literal: true

module System
  class Enums::UploadType < BrickGraphQL::BaseEnum
    description 'Upload types'

    value "AVATAR", "Account avatar"
    value "DOC", "Page block"
  end
end
