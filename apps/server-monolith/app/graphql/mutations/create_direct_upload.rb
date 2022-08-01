# frozen_string_literal: true

module Mutations
  class CreateDirectUpload < ::Mutations::BaseMutation
    argument :block_id, Scalars::UUID, 'block id', required: false
    argument :input, Types::DirectUploadInput, required: true
    argument :type, Types::UploadType, required: true
    field :direct_upload, Types::DirectUpload, null: false

    SERVICE_MAP =
      if Rails.env.in?(['development', 'test', 'cicd'])
        { 'AVATAR' => :local_public, 'DOC' => :local_private, 'THIRD' => :local_public }
      else
        { 'AVATAR' => :gcs_public, 'DOC' => :gcs_privtae, 'THIRD' => :gcs_public }
      end

    DEFAULT_MIME_TYPE = 'application/octet-stream'

    def resolve(args)
      input = args[:input]
      type = args[:type]

      if type == 'DOC'
        raise Mashcard::GraphQL::Errors::ArgumentError, :need_block_id if args[:block_id].nil?

        block = Docs::Block.unscoped.find(args[:block_id])
        pod = block.pod
      else
        pod = current_user
      end

      service = SERVICE_MAP.fetch(type)
      # https://edgeapi.rubyonrails.org/classes/ActiveStorage/Blob.html#method-c-create_before_direct_upload-21
      new_input = input.to_h.merge(service_name: service)

      block_id = args[:block_id] || 'global'

      key = "#{pod.username}/#{block_id}/#{ActiveStorage::Blob.generate_unique_secure_token}_#{input[:filename]}"
      # https://github.com/rails/rails/blob/main/activestorage/app/models/active_storage/blob.rb#L116
      blob = ActiveStorage::Blob.create!(
        new_input.merge(
          key: key,
          content_type: input[:content_type].presence || DEFAULT_MIME_TYPE,
          operation_type: type,
          pod_id: pod.id,
          user_id: current_user.id,
          block_id: args[:block_id]
        )
      )

      if type == 'DOC'
        block = Docs::Block.find_by(id: args[:block_id])

        ## Ensure exist
        block.update!(deleted_at: nil) if block.deleted_at

        if block
          block.attach_blob!(blob.id)
        else
          Mashcard::Redis.with(:cache) do |redis|
            key = "blob_#{args[:block_id]}"
            redis.sadd(key, blob.id)
            redis.expire(key, 1.hour)
          end
        end
      end

      {
        direct_upload: {
          upload_url: blob.service_url_for_direct_upload,
          # NOTE: we pass headers as JSON since they have no schema
          headers: blob.service_headers_for_direct_upload,
          signed_id: blob.signed_id,
          blob_key: blob.key,
          view_url: blob.real_url,
          download_url: blob.real_url(disposition: 'attachment'),
        },
      }
    end
  end
end
