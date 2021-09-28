
# frozen_string_literal: true

class Current < ActiveSupport::CurrentAttributes
  attribute :user, :timezone, :locale
  attribute :pod
  attribute :redis_values
  attribute :paths

  # Implementing time zone conversion in PWA, uses UTC time in server-side
  # resets { Time.zone = BrickdocConfig.default_timezone }

  def user=(user)
    super
    self.timezone = user&.timezone
  end
end
