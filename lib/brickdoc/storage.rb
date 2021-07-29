# frozen_string_literal: true
module Brickdoc
  module Storage
    extend self

    def url_helper
      @url_helper ||= Rails.application.routes.url_helpers
    end

    def public?(service)
      ActiveStorage::Blob.services.fetch(service).public?
    end

    def url_prefix(service)
      if public?(service)
        url_helper.rails_service_blob_proxy_url(filename: "?", signed_id: "?")
      else
        url_helper.rails_service_blob_url(filename: "?", signed_id: "?")
      end
    end

    def blob_url(blob)
      return nil if blob.nil?

      filename = blob.filename_in_database.presence || "unknown"
      signed_id = blob.signed_id

      if public?(blob.service_name)
        ## NOTE CDN
        url_helper.rails_service_blob_proxy_url(filename: filename, signed_id: signed_id)
      else
        url_helper.rails_service_blob_url(filename: filename, signed_id: signed_id)
      end
    end
  end
end
