# frozen_string_literal: true

module Mashcard
  module Storage
    extend self

    def url_helper
      @url_helper ||= Rails.application.routes.url_helpers
    end

    def public?(service)
      ActiveStorage::Blob.services.fetch(service).public?
    end

    def real_url(blob, params = {})
      return nil if blob.nil?

      filename = blob.filename_in_database.presence || 'unknown'
      signed_id = blob.signed_id

      p = params.merge({ filename: filename, signed_id: signed_id })

      if public?(blob.service_name)
        ## NOTE CDN
        url_helper.rails_service_blob_proxy_url(p)
      else
        url_helper.rails_service_blob_url(p)
      end
    end
  end
end
