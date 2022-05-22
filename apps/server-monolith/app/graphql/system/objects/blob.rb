# typed: strict
# frozen_string_literal: true

module System
  module Objects
    class Blob < BrickGraphQL::BaseObject
      graphql_name 'blob'
      description 'ActiveStorage blobs'

      field :blob_key, String, 'Blob key', null: false
      field :download_url, String, 'Blob url', null: false
      field :url, String, 'Blob url', null: false
    end
  end
end
