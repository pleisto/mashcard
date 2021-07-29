# frozen_string_literal: true
module System
  module Objects
    class DirectUpload < BrickGraphQL::BaseObject
      description "Represents direct upload credentials"

      field :url, String, "Upload URL", null: false
      field :headers, GraphQL::Types::JSON, "HTTP request headers (JSON-encoded)", null: false
      field :blob_key, ID, "Created blob record key", null: false
      field :signed_blob_id, ID, "Created blob record signed ID", null: false
    end
  end
end
