# frozen_string_literal: true
module Docs
  module Objects
    class BlockPage < BlockAttachment
      field :key, String, "key", null: false
      field :type, Enums::Blocktype, "type", null: true
      field :title, String, "title", null: true
      field :link, String, "link", null: false
      field :icon, String, "icon", null: true
    end
  end
end
