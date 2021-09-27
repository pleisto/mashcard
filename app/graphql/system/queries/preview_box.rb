# frozen_string_literal: true

module System
  class Queries::PreviewBox < BrickGraphQL::BaseResolver
    description 'return preview box data of url'
    type System::Objects::PreviewBox, null: false
    argument :url, GraphQL::Types::String, required: true

    def resolve(url:)
      preview_data = cache_fragment(expires_in: 3.hours) do
        Brickdoc::PreviewBox.preview(url)
      end
      preview_data.merge({
        url: url
      })
    end
  end
end
