# frozen_string_literal: true

require 'action_cable/subscription_adapter/redis'

Rails.application.configure do
  config.action_cable.mount_path = '/$internal-apis/$realtime'
  config.action_cable.worker_pool_size = ENV.fetch('ACTION_CABLE_WORKER_POOL_SIZE', 4).to_i
  ActionCable::Server::Connections::BEAT_INTERVAL = 30
end

ActionCable::SubscriptionAdapter::Redis.redis_connector = ->(config) do
  config[:id] = nil
  ::Redis.new(config.except(:adapter, :channel_prefix))
end
