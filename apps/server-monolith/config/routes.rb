# frozen_string_literal: true

Rails.application.routes.draw do
  draw :accounts

  # https://web.dev/change-password-url/
  get '/.well-known/change-password' => redirect('/accounts/password/edit')

  ## ActiveStorage::Blob#service_url_for_direct_upload
  put '/$internal-apis/storage/disk/:encoded_token' => 'active_storage/disk#update', as: :update_rails_disk_service
  ## ActiveStorage::Blob#url
  get '/$internal-apis/storage/disk/:encoded_key/*filename' => 'storages#disk', as: :rails_disk_service

  get '/$internal-apis/storage/blobs/redirect/:signed_id/*filename' => 'storages#blob_redirect', as: :rails_service_blob
  get '/$internal-apis/storage/blobs/proxy/:signed_id/*filename' => 'storages#blob_proxy', as: :rails_service_blob_proxy

  get '/$internal-apis/storage/representations/redirect/:signed_blob_id/:variation_key/*filename' => 'storages#representation_redirect',
    as: :rails_blob_representation
  get '/$internal-apis/storage/representations/proxy/:signed_blob_id/:variation_key/*filename' => 'storages#representation_proxy',
    as: :rails_blob_representation_proxy

  # Internal APIs
  post '/$internal-apis/$graph' => 'internal_apis#graphql', default: { format: :json }, as: 'internal_graphql_api'
  get '/$internal-apis/locales/:ns.:locale' => 'internal_apis#show_locales', defaults: { format: :json }

  get '/$server-context.js' => 'pages#server_context'

  root 'pages#pwa'
  get '*path' => 'pages#pwa', constraints: ->(request) { !request.xhr? && request.format.html? }
end
