# frozen_string_literal: true
module Docs
  class Objects::MetaBlock < Objects::BlockBaseObject
    description "doc blocks"

    def self.data_payload
      []
    end

    def self.meta_payload
      [
        {
          name: :attrs,
          type: String,
          description: 'attrs',
          opts: { null: true }
        },
        {
          name: :marks,
          type: String,
          description: 'marks',
          opts: { null: true }
        },
      ]
    end

    field :data, data_object, null: false
    field :meta, meta_object, null: false
  end
end
