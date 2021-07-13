# frozen_string_literal: true
module Docs
  class Objects::ParagraphBlock < Objects::BlockBaseObject
    description "paragraph blocks"

    def self.data_payload
      [
        {
          name: :title,
          type: String,
          description: 'page title',
          opts: { null: false }
        },
      ]
    end

    def self.meta_payload
      [
        {
          name: :attrs,
          type: String,
          description: 'attrs',
          opts: { null: true }
        },
      ]
    end

    field :data, data_object, null: false
    field :meta, meta_object, null: false
  end
end
