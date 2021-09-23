# frozen_string_literal: true
BrickdocPlugin.load_plugins

## Enabled Global Plugin
default_global_plugins = %i(google_auth github_auth)
BrickdocConfig.on(:global) do
  default_global_plugins.each { |name| BrickdocPlugin.plugin(name).default_enabled! }
end
