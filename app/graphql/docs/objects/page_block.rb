# frozen_string_literal: true
module Docs
  class Objects::PageBlock < Objects::BlockBaseObject
    description "page blocks"

    def self.data_payload
      [
        {
          name: :title,
          type: String,
          description: 'page title',
          opts: { null: true }
        },
      ]
    end

    def self.meta_payload
      [
        {
          name: :icon,
          type: String,
          description: 'page icon',
          opts: { null: true }
        },
        {
          name: :cover,
          type: BrickGraphQL::Scalars::HttpUrl,
          description: 'cover image',
          opts: { null: true }
        },
      ]
    end

    field :data, data_object, null: false
    field :meta, meta_object, null: false
  end
end
