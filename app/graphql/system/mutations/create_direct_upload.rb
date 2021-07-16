# frozen_string_literal: true
module System
  class Mutations::CreateDirectUpload < GraphQL::Schema::Mutation
    argument :input, Inputs::DirectUploadInput, required: true
    argument :type, Enums::UploadType, required: true
    field :direct_upload, Objects::DirectUpload, null: false

    def resolve(input:, type:)
      # https://edgeapi.rubyonrails.org/classes/ActiveStorage/Blob.html#method-c-create_before_direct_upload-21
      args = input.to_h.merge(service_name: BrickdocConfig.active_storage_service.to_sym)

      # TODO: https://stackoverflow.com/a/51110844
      ActiveStorage::Current.host = BrickdocConfig.host

      ## TODO Current.pod.id
      pod_id = Current.user.pods.first.id

      # https://github.com/rails/rails/blob/main/activestorage/app/models/active_storage/blob.rb#L116
      blob = ActiveStorage::Blob.create!(args.merge(pod_id: pod_id, key: nil, metadata: nil))

      {
        direct_upload: {
          url: blob.service_url_for_direct_upload,
          # NOTE: we pass headers as JSON since they have no schema
          headers: blob.service_headers_for_direct_upload.to_json,
          blob_id: blob.id,
          signed_blob_id: blob.signed_id
        },
        type: type
      }
    end
  end
end
