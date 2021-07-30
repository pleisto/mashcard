# frozen_string_literal: true
module System
  class Mutations::CreateDirectUpload < BrickGraphQL::BaseMutation
    argument :input, Inputs::DirectUploadInput, required: true
    argument :type, Enums::UploadType, required: true
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: false
    field :direct_upload, Objects::DirectUpload, null: false

    SERVICE_MAP = {
      "AVATAR" => :local_public,
      "DOC" => :local_private,
      "THIRD" => :local_public
    }

    def resolve(args)
      input = args[:input]
      type = args[:type]
      service = SERVICE_MAP.fetch(type)
      # https://edgeapi.rubyonrails.org/classes/ActiveStorage/Blob.html#method-c-create_before_direct_upload-21
      args = input.to_h.merge(service_name: service)

      # TODO: https://stackoverflow.com/a/51110844
      ActiveStorage::Current.host = BrickdocConfig.host

      # https://github.com/rails/rails/blob/main/activestorage/app/models/active_storage/blob.rb#L116
      blob = ActiveStorage::Blob.create!(args.merge(
        operation_type: type, pod_id: current_pod.fetch('id'), user_id: current_user.id, block_id: args[:block_id]
      ))

      if args[:block_id]
        Docs::Block.find(args[:block_id]).attachments.attach blob.signed_id
      end

      {
        direct_upload: {
          upload_url: blob.service_url_for_direct_upload,
          # NOTE: we pass headers as JSON since they have no schema
          headers: blob.service_headers_for_direct_upload.to_json,
          blob_key: blob.key,
          view_url: blob.real_url
        }
      }
    end
  end
end
