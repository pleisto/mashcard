# frozen_string_literal: true

module Resolvers
  class PreviewBox < BaseResolver
    description 'return preview box data of url'
    type Types::PreviewBox, null: false
    argument :url, GraphQL::Types::String, required: true

    def resolve(url:)
      cache_fragment(expires_in: 3.hours) do
        Mashcard::PreviewBox.preview(url).merge({
          url: url,
        })
      end
    end
  end
end
