# frozen_string_literal: true
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'rails', '~> 6.1.3', '>= 6.1.3.2'
gem 'pg', '~> 1.2.3'
gem 'marginalia', '~> 1.10.0'
gem 'puma', '~> 5.3', '>= 5.3.2'
gem 'puma_worker_killer', '~> 0.3.1'
gem 'hiredis', '~> 0.6.3'
gem 'redis', '~>4.2.5'
gem 'redis-objects', '~>1.5.0'
gem 'redis-namespace', '~> 1.8', '>= 1.8.1'
gem 'dotenv-rails', '~> 2.7', '>= 2.7.6'
gem 'connection_pool', '~> 2.2', '>= 2.2.5'
gem 'faraday', '~> 1.4', '>= 1.4.2'
gem 'typhoeus', '~> 1.4'
gem 'oj'
gem 'fast_blank', '>= 1.0', require: false
gem 'fast_underscore', '>= 0.3.1', require: false
gem 'actionview_precompiler'
gem 'second_level_cache', '~> 2.6', '>= 2.6.4'
gem 'packwerk', '~> 1.1', '>= 1.1.3'

gem 'cloak-rb', '>= 0.1.0'
gem 'lockbox', '>= 0.6.4'
gem 'lograge', '~> 0.11.2'
gem 'logstop', '>= 0.2.7'
gem 'fast_woothee', '~> 1.6', '>= 1.6.4'
gem 'accept_language', '>= 2.0.1'
gem 'nokogiri', '~> 1.11', '>= 1.11.5'

# Feature toggles
gem 'flipper', '~> 0.21.0'
gem 'flipper-active_record', '~> 0.21.0'
gem 'flipper-active_support_cache_store', '~> 0.21.0'

gem 'rails-settings-cached', '>= 2.6'
gem 'default_value_for', '~> 3.4'

# GraphQL
gem 'graphql', '~> 1.12', '>= 1.12.12'
gem 'graphql-fragment_cache', '~> 1.8'
gem 'apollo_upload_server', '~> 2.0', '>= 2.0.5'
gem 'graphql-batch', '~> 0.4.3'

# Frontend
gem 'webpacker', '6.0.0.beta.7'

## IAM
gem 'action_policy', '~> 0.5.7'
gem 'action_policy-graphql', '~> 0.5.3'
gem 'doorkeeper', '~> 5.5', '>= 5.5.2'
gem 'doorkeeper-jwt', '~> 0.4.0'
gem 'doorkeeper-openid_connect', '~> 1.8'
gem 'devise', '~> 4.8'
# gem 'devise-two-factor', '~> 4.0'
gem 'omniauth', '~> 2.0', '>= 2.0.4'
gem 'omniauth-rails_csrf_protection', '~> 1.0'
gem 'omniauth-github', '~> 2.0'
gem 'cityhash', '~> 0.9.0'

## Docs
gem 'rdeunicode', '~> 0.1.1'
gem 'pg_ltree', '~> 1.1', '>= 1.1.8'

## Background Tasks
gem 'sidekiq', '~> 6.2', '>= 6.2.1'
gem 'sidekiq-cron', '~> 1.2'
gem 'premailer-rails', '~> 1.11', '>= 1.11.1' # mailer

gem 'bootsnap', '>= 1.4.4', require: false
gem 'tzinfo-data', '~> 1.2021', '>= 1.2021.1' # Don't rely on Linux/macOS timezone data.
group :development, :test do
  gem 'brakeman'
  gem 'ffaker'
  gem 'rubocop', '>= 1.17'
  gem 'rubocop-brickdoc', require: false, path: 'packages/rubocop-brickdoc'
  gem 'factory_bot_rails', '>= 6.2'
  gem 'rspec-rails', '>= 4.0.2'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :test do
  gem 'shoulda-matchers'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  # gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
  # Spring speeds up development by keeping your appli
  # cation running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'annotate'
end

# SaaS Edition
saas_path = 'packages/saas'
gem 'brickdoc-saas', path: saas_path if File.exist?("#{saas_path}/brickdoc-saas.gemspec")
