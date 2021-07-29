# frozen_string_literal: true
module System
  module Objects
    class Blob < BrickGraphQL::BaseObject
      graphql_name 'blob'
      description 'ActiveStorage blobs'

      field :key, String, 'Blob key', null: false
      field :url, String, 'Blob url', null: false
    end
  end
end
