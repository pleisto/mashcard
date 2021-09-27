# frozen_string_literal: true
module Docs
  module Objects
    class BlockLink < BlockAttachment
      field :key, String, "key", null: false
      field :type, String, "type", null: false
      field :source, Enums::Filesourcetype, "type", null: false
      field :cover, String, "cover", null: true
      field :description, String, "description", null: true
      field :title, String, "title", null: true
    end
  end
end
