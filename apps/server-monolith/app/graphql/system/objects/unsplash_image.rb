# typed: strict
# frozen_string_literal: true

module System
  module Objects
    class UnsplashImage < BrickGraphQL::BaseObject
      graphql_name 'unsplash_image'
      description 'Unspash image.'

      field :full_url, String, 'url for full size image', null: false
      field :height, Int, 'Image height', null: true
      field :id, String, 'Unsplash image id', null: false
      field :small_url, String, 'url for small size image', null: false
      field :username, String, 'username', null: true
      field :width, Int, 'Image width', null: true
    end
  end
end
