# frozen_string_literal: true

# Sidekiq
require 'sidekiq/web'
authenticate :user, lambda { |u| Stafftools::SidekiqPolicy.new(user: u).write? } do
  mount Sidekiq::Web => '/stafftools/sidekiq'
end
scope(module: 'stafftools') do
end
