# frozen_string_literal: true

module Types
  class PreviewBox < Types::BaseObject
    graphql_name 'PreviewBox'

    field :cover, String, 'preview cover', null: true
    field :description, String, 'preview description', null: true
    field :icon, String, 'preview icon', null: true
    field :size, String, 'preview conetent size', null: true
    field :title, String, 'preview title', null: false
    field :type, String, 'preview conetent type', null: true
    field :url, String, 'preview url', null: false
  end
end
