# typed: true
# frozen_string_literal: true

# rubocop:disable Sorbet/ConstantsFromStrings

class BrickdocPlugin
  @plugins = {}

  class << self
    def plugin(plugin_name)
      @plugins[plugin_name.to_sym]
    end

    def register(plugin_name)
      plugin_name = plugin_name.to_sym
      @plugins[plugin_name] ||= new(plugin_name)
    end

    def loaded?(plugin_name)
      plugin(plugin_name).present?
    end

    def enabled?(plugin_name)
      plugin(plugin_name).enabled?
    end

    def config(plugin_name, &block)
      register(plugin_name).config(&block) if block
    end

    def load_plugins(plugins_paths = Brickdoc.monorepo_root.join('plugins/*'))
      Dir[plugins_paths].each do |path|
        plugin_file = "#{path}/plugin.rb"
        if File.exist?(plugin_file)
          load_plugin(path)
        end
      end
    end

    def load_plugin(path)
      plugin_name = path.split('/').last.to_sym
      plugin = register plugin_name
      plugin.loader.plugin_dir = "#{path}/"
      plugin_file = "#{path}/plugin.rb"
      plugin.instance_eval(File.read(plugin_file), plugin_file) if File.exist?(plugin_file)

      metadata_file = "#{path}/package.yml"
      config = File.exist?(metadata_file) ? YAML.load(File.read(metadata_file)) : {}
      plugin.metadata = config['metadata']&.deep_symbolize_keys || {}

      plugin_main_file = "#{path}/lib/#{plugin_name}"
      require "#{path}/lib/#{plugin_name}" if File.exist?("#{plugin_main_file}.rb")

      plugin_constant_name = plugin_name.to_s.camelize
      plugin_constant = if const_defined?(plugin_constant_name)
        const_get(plugin_constant_name)
      else
        const_set(
          plugin_constant_name, Module.new
        )
      end

      # non-engine plugin autoload dirs
      ['app/models', 'app/helpers', 'app/graphql', 'app/controllers', 'app/policies'].each do |dir|
        plugin.loader.push_dir(dir, namespace: plugin_constant)
      end
      plugin.loader.setup
      plugin.loader.eager_load

      # i18n
      I18n.load_path += Dir["#{path}/config/locales/*.yml"]

      if plugin.load_engine
        require "#{path}/engine.rb"
        engine_constant = const_get(plugin_constant_name + '::Engine')
        engines_to_mount[plugin_name] = engine_constant if engine_constant.routes?
      end
    end

    def engines_to_mount
      @engines_to_mount ||= {}
    end

    # TODO: cached with BrickSetting in current domain
    def enabled_plugin_keys
      @plugins.select { |_, plugin| plugin.enabled? }.keys
    end

    def enabled_plugins
      @plugins.select { |_, plugin| plugin.enabled? }.values
    end

    def all_plugins
      @plugins
    end

    # TODO: switch domain of BrickdocConfig and enable Hook scopes in one place
    def update_hooks_scopes
      BrickdocHook.enabled_scopes =
        BrickdocHook.enabled_scopes.select { |s| !s.start_with?('plugin.') } +
        enabled_plugin_keys.map { |pn| "plugin.#{pn}" }
    end
  end

  attr_accessor :metadata, :plugin_name
  attr_reader :plugin_constant
  attr_reader :load_engine

  def initialize(plugin_name)
    @plugin_name = plugin_name
    @loader = BrickdocPlugin::Loader.new
    BrickdocConfig.field("#{@plugin_name}_enabled", type: :boolean, scope: 'plugins', default: false)
  end

  def config(&block)
    instance_eval(&block) if block
  end

  def loader(&block)
    @loader.instance_eval(&block) if block
    @loader
  end

  # enabled rails engine mode
  def load_engine!
    @load_engine = true
  end

  def settings(&block)
    BrickdocConfig.current.scope("plugin.#{@plugin_name}", &block)
  end

  def attributes
    {
      name: @plugin_name,
      metadata: @metadata,
      version: @metadata.fetch(:version),
      logo: @metadata[:logo] || '',
      enabled: enabled?,
    }
  end

  # enable this plugin by default
  def default_enabled!
    BrickdocConfig.current.get_field("#{@plugin_name}_enabled", scope: 'plugins')[:default] = true
    BrickdocPlugin.update_hooks_scopes
  end

  def enabled?
    BrickdocConfig.current.get("#{@plugin_name}_enabled", scope: 'plugins')
  end

  def enabled=(enabled)
    BrickdocConfig.current.set("#{@plugin_name}_enabled", enabled, scope: 'plugins')
    BrickdocPlugin.update_hooks_scopes
  end

  def enabled!
    self.enabled = true
  end

  def disabled!
    self.enabled = false
  end

  def on(hook_name, &block)
    BrickdocHook.on(hook_name, scope: "plugin.#{@plugin_name}", &block)
  end
end
