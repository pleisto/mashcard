# typed: false
# frozen_string_literal: true

module Brickdoc
  class Logger < ::Logger
    include ActiveSupport::LoggerSilence

    def initialize(*args)
      super
      @formatter = Brickdoc::Log::JsonFormatter.new
    end
  end
end
