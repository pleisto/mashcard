# frozen_string_literal: true

module Brickdoc
  module Plugins
    # ServerPlugin is a plugin that has `server` extension point.
    # It will be used to start a server, and must be globally available.
    module ServerPlugin
      # Entrypoint of the plugin.
      ENTRYPOINT_FILE = 'server_plugin.rb'
      @hook_containers = {}

      class << self
        attr_reader :hook_containers

        # This method will be called when the server plugin is loaded.
        # @param [Brickdoc::Plugins::Instance] instance
        def load!(instance)
          entrypoint = load_entrypoint(instance.path)
          parse = DSLParser.new(instance.id, instance.path)

          # Push lib directory to load path if it is exist
          parse.loader.plugin_dir = File.join(instance.path, 'lib')
          parse.loader.setup
          parse.loader.eager_load

          # Execute the entrypoint in DSL parser
          parse.instance_eval(entrypoint)
        end

        # Register a hook as dependency injection container.
        # See https://dry-rb.org/gems/dry-container/0.7/ for more details.
        # @param [String] plugin_id {Brickdoc::Plugins::Instance#id}
        # @param [Symbol] hook_name {Brickdoc::Plugins::ServerPlugin::Hooks.methods}
        # @param [lambda] &block
        def register_hook(plugin_id, hook_name, &block)
          unless Hooks.singleton_class.method_defined?(hook_name)
            Rails.logger.warn "Unknonw hook #{hook_name} will be ignored.(plugin_id: #{plugin_id})"
            return
          end
          hook_containers[hook_name] ||= Dry::Container.new
          hook_containers[hook_name].register(plugin_id, &block)
        end

        # Find registered hook by hook name.
        def find_hook(hook_name)
          container = hook_containers[hook_name.to_sym]
          # Ignore all hooks that provided by disabled plugins.
          container._container.delete_if { |key, _| !Plugins.enabled? key }
          container
        end

        private

        # Validate the entrypoint file of the plugin exists and load it.
        # @param [String] path the path to the plugin
        # @raise [RuntimeError] if the plugin path is invalid
        def load_entrypoint(path)
          full_path = File.join(path, ENTRYPOINT_FILE)
          raise "file #{full_path} is not exist, but it is required for server plugin." unless File.exist?(full_path)

          File.read(full_path)
        end
      end
    end
  end
end
