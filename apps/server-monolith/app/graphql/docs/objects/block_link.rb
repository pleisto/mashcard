# frozen_string_literal: true

module Docs
  module Objects
    class BlockLink < BlockAttachment
      field :cover, String, 'cover', null: true
      field :description, String, 'description', null: true
      field :display_name, String, 'display name', null: true
      field :icon, String, 'icon', null: true
      field :key, String, 'key', null: true
      field :source, Enums::Filesourcetype, 'source', null: true
      field :title, String, 'title', null: true
      field :type, String, 'type', null: false
    end
  end
end
