# frozen_string_literal: true

require 'sidekiq-unique-jobs'

Sidekiq.configure_server do |config|
  config.redis = Brickdoc::Redis.pool(:queue)
  config.client_middleware { |c| c.add SidekiqUniqueJobs::Middleware::Client }
  config.server_middleware { |c| c.add SidekiqUniqueJobs::Middleware::Server }
  SidekiqUniqueJobs::Server.configure(config)
end

Sidekiq.configure_client do |config|
  config.redis = Brickdoc::Redis.pool(:queue)
  config.client_middleware { |c| c.add SidekiqUniqueJobs::Middleware::Client }
end
