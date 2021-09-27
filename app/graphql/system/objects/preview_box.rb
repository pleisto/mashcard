# frozen_string_literal: true
module System
  module Objects
    class PreviewBox < BrickGraphQL::BaseObject
      graphql_name 'preview_box'

      field :title, String, 'preview title', null: false
      field :description, String, 'preview description', null: false
      field :url, String, 'preview url', null: false
      field :cover, String, 'preview cover', null: true
    end
  end
end
