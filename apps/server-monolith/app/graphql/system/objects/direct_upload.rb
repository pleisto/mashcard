# typed: strict
# frozen_string_literal: true

module System
  module Objects
    class DirectUpload < BrickGraphQL::BaseObject
      description 'Represents direct upload credentials'

      field :blob_key, String, 'Created blob record key', null: false
      field :download_url, String, 'Download url', null: false
      field :headers, GraphQL::Types::JSON, 'HTTP request headers (JSON-encoded)', null: false
      field :signed_id, String, 'Blob signed id', null: false
      field :upload_url, String, 'Upload URL', null: false
      field :view_url, String, 'View url', null: false
    end
  end
end
