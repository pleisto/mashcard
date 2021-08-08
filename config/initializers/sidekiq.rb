 Sidekiq.configure_server do |config|
    config.redis = Brickdoc::Redis.pool(:queue)
  end

  Sidekiq.configure_client do |config|
    config.redis = Brickdoc::Redis.pool(:queue)
  end
