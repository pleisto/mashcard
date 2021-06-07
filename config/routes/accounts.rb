# frozen_string_literal: true

devise_for :users,
           class_name: "Accounts::User",
           path: 'accounts',
           controllers: {
             sessions: 'accounts/sessions',
             registrations: 'accounts/registrations'
           }
