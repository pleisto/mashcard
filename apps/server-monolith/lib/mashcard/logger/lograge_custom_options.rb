# frozen_string_literal: true

module Mashcard
  module Logger
    module LogrageCustomOptions
      def self.call(event)
        exceptions = ['controller', 'action', 'format', 'id']
        {
          env: Rails.env,
          hostname: event.payload[:host] || Mashcard::Runtime.hostname,
          time: Time.now.utc.iso8601(3),
          remote_ip: event.payload[:remote_ip],
          current_user_id: event.payload[:current_user]&.id,
          current_pod_id: event.payload[:current_pod]&.fetch('id'),
          ua: event.payload[:ua],
          exception: event.payload[:exception]&.first,
          exception_message: event.payload[:exception]&.last.to_s,
          exception_backtrace: event.payload[:exception_object]&.backtrace&.join(','),
          request_id: event.payload[:request_id],
          params: Oj.dump(event.payload[:params]&.except(*exceptions)),
          severity: 'info',
        }.compact
      end
    end
  end
end
