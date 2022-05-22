# typed: strict
# frozen_string_literal: true

module Docs
  module Enums
    class Embedtype < BrickGraphQL::BaseEnum
      value 'UPLOAD', 'UPLOAD'
      value 'LINK', 'LINK'
      value 'GALLERY', 'GALLERY'
    end
  end
end
