# frozen_string_literal: true

module Brickdoc
  module Plugins
    # JsBundlePlugin could inject any js or assets file to vite bundle.
    # This is low-level extension point, and it is recommended to use
    # a higher-level extension point such as `block` or `formula` instead.
    # NOTE: This is only could be enabled globally, and does not execute
    # in a sandbox.
    module JsBundlePlugin
      ENTRYPOINT_FILE = 'src/entrypoints/index.ts'
      @entrypoints = {}
      class << self
        def load!(instance)
          file_path = File.join(instance.path, ENTRYPOINT_FILE)
          raise "#{file_path} is not exist, but it is required for js-bundle plugin." unless File.exist?(file_path)

          # ViteRails::Config.singleton_class.prepend(Module.new do end)
          @entrypoints[instance.id] = file_path
        end

        # Get all entrypoints that are registered by enabled plugins.
        def enabled_entrypoints
          @entrypoints.select { |key, _| Plugins.enabled? key }.values
        end
      end
    end
  end
end
