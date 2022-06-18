# frozen_string_literal: true

module Types
  module Blocks
    class Page < Attachment
      graphql_name 'BlockPage'
      field :icon, String, 'icon', null: true
      field :key, String, 'key', null: false
      field :link, String, 'link', null: false
      field :title, String, 'title', null: true
      field :type, BlockType, 'type', null: true
    end
  end
end
