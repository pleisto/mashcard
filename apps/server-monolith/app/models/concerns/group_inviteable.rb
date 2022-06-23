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
    Mashcard::Redis.with(:persistence) do |r|
      if invite_secret.present?
        r.set(invite_secret_redis_key, invite_secret)
      else
        r.del(invite_secret_redis_key)
      end
    end
  end

  private

  def invite_secret_redis_key
    "group_invite_secret:#{id}"
  end
end
