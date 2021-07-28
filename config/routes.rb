# frozen_string_literal: true
Rails.application.routes.draw do
  draw :accounts
  draw(:devtools) unless Rails.env.production?

  ## ActiveStorage::Blob#service_url_for_direct_upload
  put "/.internal-apis/storage/disk/:encoded_token" => "active_storage/disk#update", as: :update_rails_disk_service
  ## ActiveStorage::Blob#url
  get "/.internal-apis/storage/disk/:encoded_key/*filename" => "storages#disk", as: :rails_disk_service

  get "/.internal-apis/storage/blobs/redirect/:signed_id/*filename" => "storages#blob_redirect", as: :rails_service_blob
  get "/.internal-apis/storage/blobs/proxy/:signed_id/*filename" => "storages#blob_proxy", as: :rails_service_blob_proxy
  # get "/.internal-apis/storage/blobs/:signed_id/*filename" => "active_storage/blobs/redirect#show"

  get "/.internal-apis/storage/representations/redirect/:signed_blob_id/:variation_key/*filename" => "storages#representation_redirect",
as: :rails_blob_representation
  get "/.internal-apis/storage/representations/proxy/:signed_blob_id/:variation_key/*filename" => "storages#representation_proxy",
as: :rails_blob_representation_proxy
  # get "/.internal-apis/storage/representations/:signed_blob_id/:variation_key/*filename" => "active_storage/representations/redirect#show"

  # Internal APIs
  post '/.internal-apis/$graph' => 'internal_apis#graphql', default: { format: :json }, as: 'internal_graphql_api'
  get '/.internal-apis/locales/:ns.:locale', to: 'internal_apis#show_locales', defaults: { format: :json }

  # Pages
  get '/.well-know/unsupported' => 'pages#unsupported', as: :unsupported

  # PWA
  root 'pages#pwa'
  get '*path', to: 'pages#pwa', constraints: ->(request) { !request.xhr? && request.format.html? }
end
