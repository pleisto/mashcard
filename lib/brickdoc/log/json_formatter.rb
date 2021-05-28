# frozen_string_literal: true

module Brickdoc
  module Log
    class JsonFormatter < ::Logger::Formatter
      def call(severity, time, _program_name, message)
        message = '' if message.blank?
        severity = 'unknown' if severity.blank?
        payload = {
          level: severity,
          timestamp: time.to_i,
          hostname: Brickdoc::Runtime.hostname
        }
        if message.is_a?(Hash) && message[:event].present?
          payload.merge!(message)
        else
          payload[:message] = message
          payload[:event] = 'logger.call'
        end
        payload.to_json + "\r\n"
      end
    end
  end
end
