# frozen_string_literal: true

require 'rails_helper'

describe System::Mutations::CreateDirectUpload, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation createDirectUpload($input: CreateDirectUploadInput!) {
        createDirectUpload(input: $input) {
          directUpload {
            viewUrl
            downloadUrl
            signedId
          }
        }
      }
    GRAPHQL

    let(:password) { FFaker::Internet.password }
    let(:user) { create(:accounts_user, password: password) }

    it 'public' do
      expect(unavailable_on_openapi(mutation)).to be false
    end

    it 'avatar' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context
      input = { input: { type: "AVATAR", input: { filename: "foo.txt", checksum: "123123", byteSize: 123, contentType: "text" } } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createDirectUpload][:directUpload][:viewUrl]).not_to be_blank
      self.current_user = nil
      self.current_pod = nil
    end

    it 'doc' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context
      block = create(:docs_block, pod: user.personal_pod)
      input = { input: { type: "DOC", blockId: block.id,
                         input: { filename: "foo.txt", checksum: "123123", byteSize: 123, contentType: "text" } } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createDirectUpload][:directUpload][:viewUrl]).not_to be_blank
      self.current_user = nil
      self.current_pod = nil
    end
  end
end
