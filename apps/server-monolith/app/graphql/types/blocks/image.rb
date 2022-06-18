# frozen_string_literal: true

module Types
  module Blocks
    class Image < Attachment
      graphql_name 'BlockImage'
      field :align, String, 'align', null: true
      field :display_name, String, 'display name', null: true
      field :height, Int, 'height', null: true
      field :key, String, 'key', null: true
      field :mode, String, 'mode', null: true
      field :name, String, 'name', null: true
      field :ratio, Float, 'aspect ratio', null: true
      field :size, Int, 'size', null: true
      field :source, FileSourceType, 'type', null: true
      field :type, BlockType, 'type', null: true
      field :view_url, String, 'view url', null: true
      field :width, Int, 'width', null: true
    end
  end
end
