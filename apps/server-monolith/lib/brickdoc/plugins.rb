# frozen_string_literal: true

module Brickdoc
  # Brickdoc plugins is a extension system for Brickdoc.
  # See '/plugins/*' for examples.
  module Plugins
    class << self
      # Define a plugins path
      PLUGINS_PATHS = Brickdoc.monorepo_root.join('plugins')

      # JSON Schema validator for plugin metadata
      SCHEMA = Utils::JSONSchema.new(File.read(Rails.public_path.join('json-schema/plugin.draft-2205.json')))

      # Load all plugins
      # - Find all plugins in the plugins directory
      # - Load each plugin and register it
      # @raise [StandardError] when plugin name is duplicated
      def load_all!
        @loaded_plugins ||=
          begin
            plugins = Dir.glob(PLUGINS_PATHS.join('*/package.json')).map do |package_json|
              metadata = get_metadata(File.read(package_json))
              id = name_to_id(metadata['name'])
              # `package.json` is already validated, so we not need safe navigation operator here.
              [id, Instance.new(
                id: id,
                extension_points: metadata['extensionPoints'].map { |i| i.tr('-', '_').to_sym },
                path: File.dirname(package_json)
              ),]
            end

            # Raise error if plugins name is duplicated
            duplicates = plugins.map(&:first).duplicates
            raise "Duplicated plugin find: #{duplicates.join(', ')}" if duplicates.any?

            # Return plugins hash
            plugins.to_h
          end
      end

      # Get all plugins instances
      def all_plugins
        @loaded_plugins || {} # return {} when plugins is not loaded yet
      end

      # Get plugin instance by name or id
      # @param plugin_name_or_id [String] plugin name or id
      def find(plugin_name_or_id)
        all_plugins[name_to_id(plugin_name_or_id)]
      end

      # Check if the plugin is installed
      # @param plugin_name_or_id [String] plugin name or id
      def installed?(plugin_name_or_id)
        find(plugin_name_or_id).present?
      end

      # Check if the plugin is enabled
      # @param plugin_name_or_id [String] plugin name or id
      def enabled?(plugin_name_or_id)
        find(plugin_name_or_id)&.enabled?
      end

      # Get all enabled plugins names
      def enabled_plugin_names
        all_plugins.select { |_, plugin| plugin.enabled? }.keys
      end

      # Get all enabled plugins instances
      def enabled_plugins
        all_plugins.select { |_, plugin| plugin.enabled? }.values
      end

      # Covert plugin name as vaild ltree label
      def name_to_id(name)
        name.to_s.sub('@', '').tr('/', '.').underscore
      end

      private

      # Get plugin metadata for package.json content string
      # @param [String] plain package.json content string
      # @return [Hash] plugin metadata
      # @raise [StandardError] if the version of the plugin is not compatible
      # @raise [ArgumentError] if the package.json is not valid against json-schema
      def get_metadata(plain)
        metadata = Oj.load(plain)
        # Validate JSON schema
        SCHEMA.validate!(plain)

        # Check if the plugin is compatible with the current version of Brickdoc
        expect_var = metadata['engines']['brickdoc']
        unless Gem::Dependency.new('', expect_var).match?('', Brickdoc::VERSION)
          raise StandardError, "#{name} required brickdoc version is #{expect_ver}, but is #{Brickdoc::VERSION}"
        end

        # Return metadata if it is valid
        metadata
      end
    end
  end
end
