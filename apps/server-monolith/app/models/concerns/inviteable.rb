# frozen_string_literal: true

module Inviteable
  extend ActiveSupport::Concern

  # Lazy load and cache

  def invite_enable
    return @invite_enable_value if @invite_enable_loaded

    @invite_enable_loaded = true
    @invite_enable_value = inner_get_invite_enable
  end

  def invite_enable=(value)
    return if @invite_enable_loaded && @invite_enable_value === value

    inner_set_invite_enable!(value)
    @invite_enable_loaded = true
    @invite_enable_value = value
  end

  def invite_secret
    return @invite_secret_value if @invite_secret_loaded

    @invite_secret_loaded = true
    @invite_secret_value = inner_get_invite_secret
  end

  def invite_secret=(value)
    return if @invite_secret_loaded && @invite_secret_value === value

    inner_set_invite_secret!(value)
    @invite_secret_loaded = true
    @invite_secret_value = value
  end

  private def invite_secret_redis_key
    "invite_secret_#{id}"
  end

  private def inner_get_invite_enable
    config.get(:invite_enable)
  end

  private def inner_set_invite_enable!(invite_enable)
    config.set(:invite_enable, invite_enable)
  end

  private def inner_get_invite_secret
    Mashcard::Redis.with(:persistence) { |r| r.get(invite_secret_redis_key).presence }
  end

  # Delete key if blank
  private def inner_set_invite_secret!(invite_secret)
    Mashcard::Redis.with(:persistence) do |r|
      if invite_secret.present?
        r.set(invite_secret_redis_key, invite_secret)
      else
        r.del(invite_secret_redis_key)
      end
    end
  end
end
