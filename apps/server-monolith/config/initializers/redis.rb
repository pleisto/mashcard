# frozen_string_literal: true

# https://github.com/nateware/redis-objects

Redis::Objects.redis = Mashcard::Redis.pool(:object)
