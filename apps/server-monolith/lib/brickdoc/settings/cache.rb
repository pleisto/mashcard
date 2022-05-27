# frozen_string_literal: true

module Brickdoc
  module Settings
    # @private
    # Cache for settings
    module Cache
      # @private
      # Generate a cache key for a field
      def _cached_field_key(namespace, key, space_id, user_id, belongs_to)
        key = _full_key(namespace, key).to_s
        scope = scope_path(belongs_to, space_id: space_id, user_id: user_id)
        scope == DatabaseStore::ROOT_SCOPE ? key : "#{key}:#{scope}"
      end

      # @private
      # current cached values in request cache
      # first try to get from request cache, if not found, try to get from redis cache
      # @param cache_key [String] cache key for the field
      def _get_cached_values(cache_key)
        request_cached_values[cache_key] ||= Rails.cache.read(redis_cache_key(cache_key))
      end

      # @private
      # set current cached values in request cache and redis cache
      # @param cache_key [String] cache key for the field
      # @param value [Object] the value of the field
      def _set_cached_values(cache_key, value)
        Rails.cache.write(redis_cache_key(cache_key), value, expires_in: 1.week)
        request_cached_values[cache_key] = value
        value
      end

      # @private
      # delete current cached values in request cache and redis cache
      # @param cache_key [String] cache key for the field
      def _delete_cached_values(cache_key)
        Rails.cache.delete(redis_cache_key(cache_key))
        request_cached_values.delete(cache_key)
      end

      # @private
      # Sencond level cache for field values
      def request_cached_values
        RequestCache.field_values ||= {}
      end

      # @private
      # Only used when request cache is not hit
      def redis_cache_key(cache_key)
        "settings:#{table_name}:#{cache_key}"
      end
    end
  end
end
