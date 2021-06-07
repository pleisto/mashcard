# frozen_string_literal: true
Rails.application.routes.draw do
  draw :accounts
  # Internal APIs
  post '/.internal-apis/$graph' => 'internal_apis#graphql', default: { format: :json }, as: 'internal_graphql_api'
  get '/.internal-apis/locales/:locale', to: 'internal_apis#show_locales', defaults: { format: :json }

  # Pages
  get '/.well-know/unsupported' => 'pages#unsupported', as: :unsupported

  # PWA
  root 'pages#pwa'
  get '*path', to: 'pages#pwa', constraints: ->(request) { !request.xhr? && request.format.html? }
end
