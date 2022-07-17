# frozen_string_literal: true

module Mashcard
  module Plugins
    # Plugin instance
    class Instance
      attr_reader :id, :extension_points, :path

      def initialize(id:, extension_points:, path:)
        @id = id
        @extension_points = extension_points
        @path = path

        # define plugin enabled field in config
        # Currently, we only support enable/disable plugin in global scope
        config.field(enabled_field_name, type: :boolean, belongs_to: :global, default: false)
        # Clear the cache to avoid the default value cache remaning when the plugin no longer
        # calls the `default_enabled!` method.
        config.touch(enabled_field_name)
        load! if enabled?
      end

      # Call extension points loaders
      def load!
        return if @loaded

        ServerPlugin.load!(self) if extension_points.include?(:server)
        # TODO: jsbundle / block / formula extension point is not supported yet
        raise NotImplementedError, 'js bundle extension is under development' if extension_points.include?(:js_bundle)
        raise NotImplementedError, 'block extension is under development' if extension_points.include?(:block)
        raise NotImplementedError, 'formula extension is under development' if extension_points.include?(:formula)

        # Load i18n translations for the plugin if it exists
        Rails.application.config.i18n.load_path += Dir["#{path}/config/locales/*.yml"]
        @loaded = true
      end

      # Check if the plugin is enabled
      def enabled?
        config.get(enabled_field_name)
      end

      # Set plugin enabled state
      def enabled=(enabled)
        config.set(enabled_field_name, enabled, allow_global: true)
        load! if enabled
      end

      # Enable plugin
      def enabled!
        self.enabled = true
      end

      # Disable plugin
      def disabled!
        self.enabled = false
      end

      # If the plugin state is not set, it will be enabled by default
      def default_enabled!
        config.get_field(enabled_field_name)[:default] = true
        # clear cache
        config.touch(enabled_field_name)
        load!
        # Return true
        true
      end

      protected

      # MashcardConfig.current with plugin namespace
      def config
        MashcardConfig.current.namespace(:plugin)
      end

      private

      # Config field name for plugin enabled state
      def enabled_field_name
        "#{@id}_enabled"
      end
    end
  end
end
