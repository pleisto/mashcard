# frozen_string_literal: true

Rails.application.configure do
  config.action_cable.mount_path = '/.internal-apis/$realtime'
  config.action_cable.worker_pool_size = ENV.fetch('ACTION_CABLE_WORKER_POOL_SIZE', 4).to_i
end
