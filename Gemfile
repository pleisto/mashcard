# frozen_string_literal: true
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'rails', '~> 7.0.0.alpha2'
gem 'pg', '~> 1.2.3'
gem 'marginalia', '~> 1.11', '>= 1.11.1'
gem 'puma', '~> 5.5'
gem 'puma_worker_killer', '~> 0.3.1'
gem 'hiredis', '~> 0.6.3'
gem 'redis', '~>4.4.0'
gem 'redis-objects', '~>1.5.1'
gem 'redis-namespace', '~> 1.8', '>= 1.8.1'
gem 'dotenv-rails', '~> 2.7', '>= 2.7.6'
gem 'connection_pool', '~> 2.2', '>= 2.2.5'
gem 'faraday', '~> 1.8'
gem 'typhoeus', '~> 1.4'
gem 'oj'
gem 'fast_blank', '>= 1.0', require: false
gem 'fast_underscore', '>= 0.3.1', require: false
gem 'actionview_precompiler'
gem 'second_level_cache', '~> 2.6', '>= 2.6.4'
gem 'packwerk', '~> 1.3', '>= 1.3.2'

gem 'cloak-rb', '>= 0.1.0'
gem 'lockbox', '>= 0.6.6'
gem 'lograge', '~> 0.11.2'
gem 'logstop', '>= 0.2.7'
gem 'accept_language', '>= 2.0.1'
gem 'nokogiri', '>= 1.12.5'

gem 'aws-sdk-s3', '~> 1', '>= 1.103.0'

# Feature toggles
gem 'flipper', '~> 0.22.2'
gem 'flipper-active_record', '~> 0.22.2'
gem 'flipper-active_support_cache_store', '~> 0.22.2'

gem 'default_value_for', '~> 3.4'

# Sentry
gem "sentry-ruby"
gem "sentry-rails"

# GraphQL
gem 'graphql', '~> 1.12', '>= 1.12.16'
gem 'graphql-fragment_cache', '~> 1.9'
gem 'apollo_upload_server', '~> 2.1'
gem 'graphql-batch', '~> 0.4.3'

# Frontend
gem 'vite_rails', '~> 3.0'

## IAM
gem 'action_policy', '~> 0.6.0'
gem 'action_policy-graphql', '~> 0.5.3'
gem 'devise', github: 'brickdoc/devise'
gem 'devise-async', '~> 1.0.0'
gem 'omniauth', '~> 2.0', '>= 2.0.4'
gem 'omniauth-rails_csrf_protection', '~> 1.0'
gem 'cityhash', '~> 0.9.0'

## Background Tasks
gem 'sidekiq', '~> 6.2', '>= 6.2.2'
gem 'sidekiq-cron', '~> 1.2'
gem 'premailer-rails', '~> 1.11', '>= 1.11.1' # mailer

gem 'bootsnap', '>= 1.4.4', require: false
gem 'tzinfo-data', '~> 1.2021', '>= 1.2021.1' # Don't rely on Linux/macOS timezone data.

gem 'brickdoc_settings', path: 'gems/brickdoc_settings'

gem 'unsplash'

group :development, :test do
  gem 'cypress-on-rails', '~> 1.11.0'
  gem 'brakeman'
  gem 'ffaker'
  gem 'rubocop', '>= 1.22.1'
  gem 'rubocop-brickdoc', require: false, path: 'gems/rubocop-brickdoc'
  gem 'factory_bot_rails', '>= 6.2'
  gem 'rspec-rails', '>= 5.0.2'
  gem 'rspec_junit_formatter', '>= 0.4'
  gem 'debug', '~> 1.2', '>= 1.2.4', platforms: [:mri, :mingw, :x64_mingw]
end

group :test do
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
  gem 'simplecov-lcov', require: false
  gem 'vcr', '~> 6.0'
  gem 'webmock', '~> 3.14'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  # gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.7'
  # Spring speeds up development by keeping your appli
  # cation running in the background. Read more: https://github.com/rails/spring
  gem 'annotate'
end

# Plugin dependencies
Dir.glob('plugins/*/Gemfile').each { |p| eval_gemfile(p) }
