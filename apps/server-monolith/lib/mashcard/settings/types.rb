# frozen_string_literal: true

module Mashcard
  module Settings
    # @private
    # Add Type system support to settings.
    module Types
      # Check value is a truthy value
      # @param value [Object]
      # @return [Boolean]
      def truthy?(value)
        ['t', 'true', '1', 1, true].include?(value)
      end

      # Decode value from raw
      # @param type [Symbol] the type of the field
      # @param value [Object] the raw value of the field
      # @param :cache_key [String] the cache key of the field
      def decode_value(type, value, cache_key:)
        case type
        when :boolean
          truthy?(value)
        when :integer
          value&.to_i
        when :float
          value&.to_f
        when :encrypted
          Oj.load(_encrypt(cache_key).decrypt(value))
        else
          value
        end
      end

      # Encode value to raw
      # @param type [Symbol] the type of the field
      # @param value [Object] the value of the field
      # @param :cache_key [String] the cache key of the field
      def encode_value(type, value, cache_key:)
        case type
        when :encrypted
          _encrypt(cache_key).encrypt(Oj.dump(value))
        else
          # Rails could auto convert other value to jsonb
          value
        end
      end

      # Encrypt value with Symmetric-Encryption
      # @param cache_key [String] the cache key of the field. It will be used generate key for encryption.
      def _encrypt(cache_key)
        Lockbox.new(key: Lockbox.attribute_key(table: :settings, attribute: cache_key))
      end
    end
  end
end
