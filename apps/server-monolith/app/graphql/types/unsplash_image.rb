# frozen_string_literal: true

module Types
  class UnsplashImage < Types::BaseObject
    graphql_name 'UnsplashImage'
    description 'Unspash image.'

    field :blur_hash, String, 'Blur hash for this image (see https://blurha.sh/)', null: true
    field :full_url, String, 'url for full size image', null: false
    field :height, Int, 'Image height', null: true
    field :id, String, 'Unsplash image id', null: false
    field :small_url, String, 'url for small size image', null: false
    field :username, String, 'username', null: true
    field :width, Int, 'Image width', null: true
  end
end
