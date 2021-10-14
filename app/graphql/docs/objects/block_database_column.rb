# frozen_string_literal: true
module Docs
  module Objects
    class BlockDatabaseColumn < BlockAttachment
      field :key, String, "key", null: false
      field :type, String, "type", null: false
      field :title, String, "title", null: true
      field :width, Int, "width", null: true

      # not ruby style case
      # TODO: change BlockInput for correct case?
      field :selectOptions, [GraphQL::Types::JSON], "select options", null: true
    end
  end
end
