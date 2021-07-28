# frozen_string_literal: true

class StoragesController < ActionController::Base
  include Apiable
  include CurrentPod
  include ActionController::Cookies

  include ActiveStorage::SetCurrent
  include ActiveStorage::FileServer
  include ActiveStorage::SetHeaders

  ## NOTE Rails 6.1.4

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/base_controller.rb
  self.etag_with_template_digest = false

  before_action :set_blob, except: [:disk]
  before_action :set_representation, only: [:representation_redirect, :representation_proxy]
  before_action :authenticate_blob, only: [:blob_redirect, :representation_redirect]

  def disk
    key = decode_verified_key
    if key
      serve_file named_disk_service(key[:service_name]).path_for(key[:key]), content_type: key[:content_type],
disposition: key[:disposition]
    else
      head :not_found
    end
  rescue Errno::ENOENT
    head :not_found
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/blobs/redirect_controller.rb#L13
  def blob_redirect
    expires_in ActiveStorage.service_urls_expire_in
    redirect_to @blob.url(disposition: params[:disposition])
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/blobs/proxy_controller.rb
  def blob_proxy
    http_cache_forever public: true do
      set_content_headers_from @blob
      stream @blob
    end
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/representations/redirect_controller.rb#L11
  def representation_redirect
    expires_in ActiveStorage.service_urls_expire_in
    redirect_to @representation.url(disposition: params[:disposition])
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/representations/proxy_controller.rb#L13
  def representation_proxy
    http_cache_forever public: true do
      set_content_headers_from @representation.image
      stream @representation
    end
  end

  private

  def named_disk_service(name)
    ActiveStorage::Blob.services.fetch(name) do
      ActiveStorage::Blob.service
    end
  end

  def decode_verified_key
    ActiveStorage.verifier.verified(params[:encoded_key], purpose: :blob_key)
  end

  def stream(blob)
    blob.download do |chunk|
      response.stream.write chunk
    end
  ensure
    response.stream.close
  end

  def set_blob
    @blob = blob_scope.find_signed!(params[:signed_blob_id] || params[:signed_id])
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    head :not_found
  end

  def authenticate_blob
    pod = current_pod

    if pod&.fetch('id') != @blob.pod_id
      Rails.logger.info("No pod permission")
      head :not_found
    end
  end

  def blob_scope
    ActiveStorage::Blob
  end

  def set_representation
    @representation = @blob.representation(params[:variation_key]).processed
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    head :not_found
  end
end
