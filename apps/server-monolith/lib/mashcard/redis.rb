# frozen_string_literal: true

require 'active_support/core_ext/hash/keys'

module Mashcard
  class Redis
    # default redis url for development environment
    DEFAULT_REDIS_URL = 'redis://localhost:6379'
    # Redis database index map
    DB_MAPPING = {
      cache: 0,
      state: 1,
      queue: 2,
      persistence: 3,
      object: 4,
    }

    class << self
      # Run a block of code with a Redis connection pool
      # db [DB_MAPPING] - Redis database index
      # &block - block of code to run
      # @example
      #  Mashcard::Redis.pool(:cache) do |redis|
      #    redis.set('foo', 'bar')
      #  end
      def with(db, &block)
        pool(db).with(&block)
      end

      # Return a Redis Server version
      def version
        with(:state) { |redis| redis.info['redis_version'] }
      end

      # Get a Redis connection pool
      # db [DB_MAPPING] - Redis database index
      def pool(db)
        @pool ||= ConnectionPool.new(size: pool_size) { ::Redis.new(params(db)) }
      end

      # Calculate Redis Pool size based on the max number of threads in the app
      # @return [Integer]
      def pool_size
        # heuristic constant 4 should be a config setting somewhere -- related to CPU count?
        size = 4
        size += Mashcard::Runtime.max_threads if Mashcard::Runtime.multi_threaded?
        size
      end

      # Get Redis URL
      def url
        ENV['REDIS_URL'] || DEFAULT_REDIS_URL
      end

      # Get Redis params based on the Redis database index
      def params(db)
        {
          url: url,
          id: nil,
          logger: Rails.logger,
          db: DB_MAPPING[db],
          namespace: "mashcard:#{db}",
          ssl_params: {
            verify_mode: OpenSSL::SSL::VERIFY_NONE,
          },
        }
      end
    end
  end
end
