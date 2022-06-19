# frozen_string_literal: true

module Types
  class Blob < Types::BaseObject
    graphql_name 'Blob'
    description 'ActiveStorage blobs'

    field :blob_key, String, 'Blob key', null: false
    field :download_url, String, 'Blob url', null: false
    field :url, String, 'Blob url', null: false
  end
end
