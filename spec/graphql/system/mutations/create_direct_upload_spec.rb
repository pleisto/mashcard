# frozen_string_literal: true

require 'rails_helper'

describe System::Mutations::CreateDirectUpload, type: :mutation, focus: true do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation createDirectUpload($input: DirectUploadInput!, $type: Upload!) {
        createDirectUpload(input: $input, type: $type) {
          directUpload {
            url
          }
        }
      }
    GRAPHQL

    let(:password) { FFaker::Internet.password }
    let(:user) { create(:accounts_user, password: password) }

    it 'public' do
      expect(unavailable_on_openapi(mutation)).to be false
    end

    it 'work' do
      Current.user = user
      input = { type: "AVATAR", input: { filename: "foo.txt", checksum: "123123", byteSize: 123, contentType: "text" } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data[:createDirectUpload][:directUpload][:url]).not_to be_blank
      Current.user = nil
    end
  end
end
