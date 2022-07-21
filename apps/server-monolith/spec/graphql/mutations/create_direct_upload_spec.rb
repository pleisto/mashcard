# frozen_string_literal: true

require 'rails_helper'

describe Mutations::CreateDirectUpload, type: :mutation do
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

    let(:user) { create(:accounts_user) }

    it 'avatar' do
      self.current_user = user
      input = { input: { type: 'AVATAR',
                         input: { filename: 'foo.txt', checksum: '123123', byteSize: 123, contentType: 'text' }, } }
      graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createDirectUpload][:directUpload][:viewUrl]).not_to be_blank
      self.current_user = nil
    end

    it 'doc' do
      self.current_user = user
      block = create(:docs_block, pod: user.personal_pod)
      input = { input: { type: 'DOC', blockId: block.id,
                         input: { filename: 'foo.txt', checksum: '123123', byteSize: 123, contentType: 'text' }, } }
      graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createDirectUpload][:directUpload][:viewUrl]).not_to be_blank
      self.current_user = nil
    end
  end
end
