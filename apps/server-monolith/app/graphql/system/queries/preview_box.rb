# typed: true
# frozen_string_literal: true

module System
  module Queries
    class PreviewBox < BrickGraphQL::BaseResolver
      description 'return preview box data of url'
      type System::Objects::PreviewBox, null: false
      argument :url, GraphQL::Types::String, required: true

      def resolve(url:)
        cache_fragment(expires_in: 3.hours) do
          Brickdoc::PreviewBox.preview(url).merge({
            url: url,
          })
        end
      end
    end
  end
end
