# frozen_string_literal: true

require 'active_support/core_ext/hash/keys'

module Brickdoc
  class Redis
    DEFAULT_REDIS_URL = 'redis://localhost:6379'
    DB_MAPPING = {
      cache: 0,
      state: 1,
      queue: 2,
      persistence: 3,
      object: 4
    }

    class << self
      def with(db)
        pool(db).with { |redis| yield redis }
      end

      def with_encryption(db)
        encryption_pool(db).with { |redis| yield redis }
      end

      def version
        with(:state) { |redis| redis.info['redis_version'] }
      end

      def pool(db)
        @pool ||= ConnectionPool.new(size: pool_size) { ::Redis.new(params(db)) }
      end

      # AES-SIV Key must 32 or 64 bytes long.
      # See {https://github.com/ankane/cloak}
      def encryption_pool(db)
        @encryption_pool ||= ConnectionPool.new(size: pool_size) do
          Cloak::Redis.new(**params(db).merge({ key: "#{Rails.application.secret_key_base[0..57]}:redis" }))
        end
      end

      def pool_size
        # heuristic constant 4 should be a config setting somewhere -- related to CPU count?
        size = 4
        size += Brickdoc::Runtime.max_threads if Brickdoc::Runtime.multi_threaded?
        size
      end

      def default_url
        DEFAULT_REDIS_URL
      end

      def url
        ENV['REDIS_URL'] || DEFAULT_REDIS_URL
      end

      def params(db)
        {
          url: url,
          logger: Rails.logger,
          db: DB_MAPPING[db],
          namespace: "#{Rails.env}:brickdoc:#{db}",
          ssl_params: {
            verify_mode: OpenSSL::SSL::VERIFY_NONE
          }
        }
      end
    end
  end
end
