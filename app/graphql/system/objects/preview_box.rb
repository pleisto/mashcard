# frozen_string_literal: true
module System
  module Objects
    class PreviewBox < BrickGraphQL::BaseObject
      graphql_name 'preview_box'

      field :title, String, 'preview title', null: false
      field :description, String, 'preview description', null: true
      field :url, String, 'preview url', null: false
      field :cover, String, 'preview cover', null: true
      field :icon, String, 'preview icon', null: true
      field :type, String, 'preview conetent type', null: true
      field :size, String, 'preview conetent size', null: true
    end
  end
end
