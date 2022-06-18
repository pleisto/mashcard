# frozen_string_literal: true

module Types
  module Blocks
    class Link < Attachment
      graphql_name 'BlockLink'
      field :cover, String, 'cover', null: true
      field :description, String, 'description', null: true
      field :display_name, String, 'display name', null: true
      field :icon, String, 'icon', null: true
      field :key, String, 'key', null: true
      field :source, FileSourceType, 'source', null: true
      field :title, String, 'title', null: true
      field :type, String, 'type', null: false
    end
  end
end
