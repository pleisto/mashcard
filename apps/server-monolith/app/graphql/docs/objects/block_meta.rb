# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class BlockMeta < BrickGraphQL::BaseObject
      field :attachment, BlockAttachment, 'attachment', null: true
      field :auto_wrap, Boolean, 'code auto wrap', null: true
      field :cover, BlockCover, 'cover', null: true
      field :embed_meta, BlockEmbedMeta, 'embedMeta', null: true
      field :icon, BlockIcon, 'icon', null: true
      field :image, BlockImage, 'image', null: true
      field :link, BlockLink, 'link', null: true
      field :page, BlockPage, 'page', null: true
      field :people, BlockPeople, 'people', null: true
      field :title, String, 'title', null: true
      ## NOTE: Prosemirror builtin
      field :language, String, 'Prosemirror builtin language', null: true
      field :level, Int, 'Prosemirror builtin level', null: true
      field :start, String, 'Prosemirror builtin start', null: true
    end
  end
end
