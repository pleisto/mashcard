# frozen_string_literal: true

module GroupInviteable
  extend ActiveSupport::Concern

  def invite_enable
    config.get(:group_invite_enable)
  end

  def invite_enable=(value)
    config.set(:group_invite_enable, value)
  end

  def invite_secret
    Mashcard::Redis.with(:persistence) { |r| r.get(invite_secret_redis_key).presence }
  end

  def invite_secret=(value)
    new_value = maybe_generate_invite_secret(value)
    Mashcard::Redis.with(:persistence) do |r|
      if new_value.present?
        r.set(invite_secret_redis_key, new_value)
      else
        r.del(invite_secret_redis_key)
      end
    end
  end

  private

  def invite_secret_redis_key
    "group_invite_secret:#{id}"
  end

  def maybe_generate_invite_secret(value)
    return nil unless invite_enable
    return value if value.present?

    secret = Digest::SHA256.hexdigest("#{id}-#{Time.now.to_i}-#{Mashcard::Crypto.derive_key(:hash_salt)}")
    "#{secret[0...16]}#{hashed_id}#{secret[60..64]}"
  end
end
