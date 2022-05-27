# frozen_string_literal: true

module Brickdoc
  module Logger
    class RailsLogger < ::Logger
      include ActiveSupport::LoggerSilence

      def initialize(*args)
        super
        @formatter = RailsJsonFormatter.new
      end
    end
  end
end
