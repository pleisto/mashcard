# frozen_string_literal: true

module Brickdoc
  module Plugins
    module ServerPlugin
      # Paser for server plugin entrypoint. (server_plugin.rb)
      # provides DSL to define server plugin.
      class DSLParser
        # @param [String] id see {Brickdoc::Plugins::Instance#id}
        def initialize(id, path)
          # Push lib directory to load path if it is exist
          @loader = Loader.new
          @id = id
          @path = path
        end

        # Zeitwerk loader for server plugins.
        def loader(&block)
          @loader.instance_eval(&block) if block
          @loader
        end

        # convert plugin assets relative path to vite url
        def asset_url(path)
          Plugins::Vite.get_path "#{@path}/#{path}"
        end

        # define or get settings for the plugin
        # @example
        #  settings do
        #    field :foo, :bar
        #  end
        # SomeService.new setttings.foo
        def settings(&block)
          BrickdocConfig.current.namespace("plugin.#{@id}", &block)
        end

        # Enable extended edition mode for the plugin extended edition means that the plugin
        # will have same directory structure as server-monolith. It is helpful for create a
        # new distribution of the Brickdoc, such as Brickdoc Enterprise Edition.
        def as_extended_edition!
          @is_extended_edition = true
        end

        # Check if the plugin is enabled extended edition
        def extended_edition?
          @is_extended_edition
        end

        # Define a hook for the server plugin and inject it to the DI container.
        # @param [Symbol] hook_name {Brickdoc::Plugins::ServerPlugin::Hooks.methods}
        # @param [lambda] &block
        def on(hook_name, &block)
          ServerPlugin.register_hook(@id, hook_name, &block)
        end
      end
    end
  end
end
