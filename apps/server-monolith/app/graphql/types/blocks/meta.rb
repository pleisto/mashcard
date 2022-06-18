# frozen_string_literal: true

module Types
  module Blocks
    class Meta < Types::BaseObject
      graphql_name 'BlockMeta'
      field :attachment, Attachment, 'attachment', null: true
      field :auto_wrap, Boolean, 'code auto wrap', null: true
      field :cover, Cover, 'cover', null: true
      field :embed_meta, EmbedMeta, 'embedMeta', null: true
      field :icon, Icon, 'icon', null: true
      field :image, Image, 'image', null: true
      field :link, Link, 'link', null: true
      field :page, Page, 'page', null: true
      field :people, People, 'people', null: true
      field :title, String, 'title', null: true
      ## NOTE: Prosemirror builtin
      field :language, String, 'Prosemirror builtin language', null: true
      field :level, Int, 'Prosemirror builtin level', null: true
      field :start, String, 'Prosemirror builtin start', null: true
    end
  end
end
