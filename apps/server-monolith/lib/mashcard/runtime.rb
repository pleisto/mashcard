# frozen_string_literal: true

require 'socket'

module Mashcard
  # Provides routines to identify the current application runtime.
  module Runtime
    class << self
      def hostname
        @hostname ||= ENV['HOST'] || Socket.gethostname
      end

      def web_server?
        @web_server ||= !!defined?(::Puma::Cluster)
      end

      def kubernetes?
        # SEE {https://kubernetes.io/zh/docs/concepts/services-networking/connect-applications-service/}
        ENV['KUBERNETES_SERVICE_HOST'].present?
      end

      def cypress?
        ENV['CYPRESS'].present? && ENV['CYPRESS'] != 'false'
      end

      def test_suite?
        Rails.env.test?
      end

      def console?
        !!defined?(::Rails::Console)
      end

      def sidekiq?
        !!(defined?(::Sidekiq) && Sidekiq.server?)
      end

      def rake?
        !!(defined?(::Rake) && Rake.application.top_level_tasks.any?) || !!defined?(::Rails::Command::RunnerCommand)
      end

      def multi_threaded?
        web_server? || sidekiq?
      end

      def max_threads
        threads = 2 # main thread & action cable

        if web_server? && Puma.respond_to?(:cli_config)
          threads += Puma.cli_config.options[:max_threads]
        elsif sidekiq?
          # An extra thread for the poller in Sidekiq Cron.
          threads += Sidekiq.options[:concurrency] + 1
        end

        threads
      end

      def version
        Mashcard::VERSION
      end

      def monorepo_version
        Mashcard::MONOREPO_VERSION
      end
    end
  end
end
