# frozen_string_literal: true
module Brickdoc
  module Storage
    extend self

    def url_helper
      @url_helper ||= Rails.application.routes.url_helpers
    end

    def blob_url(blob)
      return nil if blob.nil?
      public = ActiveStorage::Blob.services.fetch(blob.service_name)
      filename = blob.filename_in_database.presence || "unknown"
      signed_id = blob.signed_id

      if public
        ## NOTE CDN
        url_helper.rails_service_blob_proxy_url(filename: filename, signed_id: signed_id)
      else
        url_helper.rails_service_blob_url(filename: filename, signed_id: signed_id)
      end
    end
  end
end
