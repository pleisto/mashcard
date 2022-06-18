# frozen_string_literal: true

module Types
  class UploadType < BaseEnum
    description 'Upload types'

    value 'AVATAR', 'Account avatar'
    value 'DOC', 'Page block'
    value 'THIRD', 'Third'
  end
end
