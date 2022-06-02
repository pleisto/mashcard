# frozen_string_literal: true

module System
  module Queries
    class UnsplashImage < BrickGraphQL::BaseResolver
      description 'return images from unsplash by search'
      type [System::Objects::UnsplashImage], null: true
      argument :page, GraphQL::Types::Int, required: false
      argument :per_page, GraphQL::Types::Int, required: false
      argument :query, GraphQL::Types::String, required: false
      authenticate_user!

      def resolve(query: false, page: false, per_page: false)
        data = if query.blank?
          Unsplash::Photo.all(page, per_page)
        else
          Unsplash::Photo.search(query, page, per_page)
        end

        data.map do |photo|
          {
            id: photo.id,
            width: photo.width,
            height: photo.height,
            full_url: photo.urls.full,
            small_url: photo.urls.small,
            username: photo.user.username,
            blur_hash: photo.blur_hash,
          }
        end
      end
    end
  end
end
