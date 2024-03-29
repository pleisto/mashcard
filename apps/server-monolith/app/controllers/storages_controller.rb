# frozen_string_literal: true

class StoragesController < ApplicationController
  include Apiable
  include CurrentPod
  include ActionController::Cookies

  include ActiveStorage::SetCurrent
  include ActiveStorage::FileServer
  # include ActiveStorage::SetBlob
  include ActiveStorage::Streaming

  ## NOTE Rails 7.0.0-alpha2

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/base_controller.rb
  # https://github.com/rails/rails/blob/v7.0.0.alpha2/activestorage/app/controllers/active_storage/base_controller.rb
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
  # https://github.com/rails/rails/blob/v7.0.0.alpha2/activestorage/app/controllers/active_storage/blobs/redirect_controller.rb#L13
  def blob_redirect
    expires_in ActiveStorage.service_urls_expire_in
    redirect_to @blob.url(disposition: params[:disposition]), allow_other_host: true
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/blobs/proxy_controller.rb
  # https://github.com/rails/rails/blob/v7.0.0.alpha2/activestorage/app/controllers/active_storage/blobs/proxy_controller.rb
  def blob_proxy
    if request.headers['Range'].present?
      send_blob_byte_range_data @blob, request.headers['Range']
    else
      http_cache_forever public: true do
        response.headers['Accept-Ranges'] = 'bytes'
        response.headers['Content-Length'] = @blob.byte_size.to_s

        send_blob_stream @blob, disposition: params[:disposition]
      end
    end
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/representations/redirect_controller.rb#L11
  # https://github.com/rails/rails/blob/v7.0.0.alpha2/activestorage/app/controllers/active_storage/representations/redirect_controller.rb#L11
  def representation_redirect
    expires_in ActiveStorage.service_urls_expire_in
    redirect_to @representation.url(disposition: params[:disposition]), allow_other_host: true
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/representations/proxy_controller.rb#L13
  # https://github.com/rails/rails/blob/v7.0.0.alpha2/activestorage/app/controllers/active_storage/representations/proxy_controller.rb#L13
  def representation_proxy
    http_cache_forever public: true do
      send_blob_stream @representation.image, disposition: params[:disposition]
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

  def set_blob
    @blob = blob_scope.find_signed!(params[:signed_blob_id] || params[:signed_id])
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    head :not_found
  end

  def authenticate_blob
    return :ok if blob_can_view?

    Rails.logger.info('No pod permission')
    head :not_found
  end

  def blob_can_view?
    pod = current_pod

    return true if pod&.fetch('id', nil) == @blob.pod_id

    return false if @blob.block_id.blank?

    block = Docs::Block.find_by(id: @blob.block_id)
    return false if block.nil?

    block.root.show_policy?(current_user)
  end

  # https://github.com/rails/rails/blob/main/activestorage/app/controllers/active_storage/representations/base_controller.rb#L3
  # https://github.com/rails/rails/blob/v7.0.0.alpha2/activestorage/app/controllers/active_storage/representations/base_controller.rb#L3
  def blob_scope
    ActiveStorage::Blob.scope_for_strict_loading
  end

  def set_representation
    @representation = @blob.representation(params[:variation_key]).processed
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    head :not_found
  end
end
