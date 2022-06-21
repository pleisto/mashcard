# frozen_string_literal: true

module Mashcard
  module Plugins
    # ServerPlugin is a plugin that has `server` extension point.
    # It will be used to start a server, and must be globally available.
    module ServerPlugin
      # Entrypoint of the plugin.
      ENTRYPOINT_FILE = 'server_plugin.rb'
      @hook_containers = {}
      @extended_edition_path = nil

      class << self
        attr_reader :hook_containers, :extended_edition_path

        # This method will be called when the server plugin is loaded.
        # @param [Mashcard::Plugins::Instance] instance
        def load!(instance)
          path = instance.path
          entrypoint = load_entrypoint(path)
          parse = DSLParser.new(instance.id, path)

          # Push lib directory to load path if it is exist
          parse.loader.plugin_dir = path
          parse.loader.push_dir('lib')
          parse.loader.setup

          # Execute the entrypoint in DSL parser
          parse.instance_eval(entrypoint)

          # Load as extended edition if it is declared
          load_extended_edition!(parse, path) if parse.extended_edition?

          # Ensure that eager load is called last
          parse.loader.eager_load
        end

        # Register a hook as dependency injection container.
        # See https://dry-rb.org/gems/dry-container/0.7/ for more details.
        # @param [String] plugin_id {Mashcard::Plugins::Instance#id}
        # @param [Symbol] hook_name {Mashcard::Plugins::ServerPlugin::Hooks.methods}
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
        # @param [Symbol] hook_name
        def find_hook(hook_name)
          container = hook_containers[hook_name.to_sym]
          return nil if container.nil?

          # Ignore all hooks that provided by disabled plugins.
          container._container.delete_if { |key, _| !Plugins.enabled? key }
          container
        end

        # Find plugin ids for the enabled plugins that have the hook.
        # @param [Symbol] hook_name
        # @example `find_plugin_ids_for_hook(:oauth_provider)` # => [:github, :password]
        def find_plugin_id_by_hook(hook_name)
          find_hook(hook_name).keys
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

        # Add app/* path to auto load path for
        # extended edition
        # @param [Mashcard::Plugins::ServerPlugin::DSLParser] parse
        # @param [String] path the path to the plugin
        def load_extended_edition!(parse, path)
          if @extended_edition_path.present?
            raise <<~ERROR
              Multiple extended edition declared found, but only one is allowed.
              Please check the following paths:
               - #{extended_edition_path} (current loaded)
               - #{path}
            ERROR
          end

          # set extended edition path
          @extended_edition_path = path

          # add app/* path to auto load path
          [
            'app/models',
            'app/controllers',
            'apps/helpers',
            'app/policies',
            'app/graphql',
          ].each do |dir|
            parse.loader.push_dir(dir)
          end
        end
      end
    end
  end
end
