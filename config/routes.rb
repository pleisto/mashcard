# frozen_string_literal: true
Rails.application.routes.draw do
  # Internal APIs
  post '/.internal-apis/$graph' => 'internal_apis#graphql', default: { format: :json }, as: 'internal_graphql_api'

  # Pages
  get '/.well-know/unsupported' => 'pages#unsupported', as: :unsupported

  # PWA
  root 'pages#pwa'
  get '*path', to: 'pages#pwa', constraints: ->(request) { !request.xhr? && request.format.html? }
end
