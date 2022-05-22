# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class BlockPage < BlockAttachment
      field :icon, String, 'icon', null: true
      field :key, String, 'key', null: false
      field :link, String, 'link', null: false
      field :title, String, 'title', null: true
      field :type, Enums::Blocktype, 'type', null: true
    end
  end
end
