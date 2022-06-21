# frozen_string_literal: true

module Mashcard
  module Settings
    # @private
    # This is second level cache, which is used to cache settings for each request.
    class RequestCache < ActiveSupport::CurrentAttributes
      # cache fields  values
      attribute :field_values

      # cache current context for settings
      # see ./base.rb#current
      attribute :current_context
    end
  end
end
