# frozen_string_literal: true

module Types
  module Blocks
    class EmbedType < BaseEnum
      graphql_name 'EmbedType'
      value 'UPLOAD', 'UPLOAD'
      value 'LINK', 'LINK'
      value 'GALLERY', 'GALLERY'
    end
  end
end
