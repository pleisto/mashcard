# typed: false
# frozen_string_literal: true

devise_for :users,
  class_name: 'Accounts::User',
  path: 'accounts',
  controllers: {
    sessions: 'accounts/sessions',
    registrations: 'accounts/registrations',
    omniauth_callbacks: 'accounts/omniauth_callbacks',
    confirmations: 'accounts/confirmations',
    unlocks: 'accounts/unlocks_callbacks',
    passwords: 'accounts/passwords',
  }
