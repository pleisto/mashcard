# frozen_string_literal: true
module Docs
  module Objects
    class BlockEmoji < BrickGraphQL::BaseObject
      field :name, String, 'name', null: false
      field :emoji, String, 'emoji', null: false
      field :slug, String, 'slug', null: false
      field :emoji_version, String, 'emoji_version', null: false
      field :unicode_version, String, 'unicode_version', null: false
      field :skin_tone_support, Boolean, 'skin_tone_support', null: false
    end
  end
end
