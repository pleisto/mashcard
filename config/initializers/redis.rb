# frozen_string_literal: true
# https://github.com/nateware/redis-objects

Redis::Objects.redis = Brickdoc::Redis.pool(:object)
