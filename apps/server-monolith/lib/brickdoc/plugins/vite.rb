# frozen_string_literal: true

module Brickdoc
  module Plugins
    # Helpers for vite manifest.
    module Vite
      VITE_SOURCE_PATH = Rails.root.join(ViteRuby.instance.config.source_code_dir)
      @cached_paths = {}
      ASSET_HOST = ViteRuby.instance.config.asset_host
      class << self
        # Convert a plugin assets absolute path to a relative path for vite bundle.
        # @param [String] absolute_path absolute path of plugin assets.
        def get_path(absolute_path)
          # Use @cached_paths as memoization, but ignore nil values
          return @cached_paths[absolute_path] if @cached_paths[absolute_path].present?

          if ViteRuby.instance.dev_server_running?
            @cached_paths[absolute_path] = "#{ASSET_HOST}/#{ViteRuby.instance.config.public_output_dir}/@fs#{absolute_path}"
          else
            facade_module_id = Pathname.new(absolute_path).relative_path_from(VITE_SOURCE_PATH).to_s
            item = ViteRuby.instance.manifest.send :find_manifest_entry, facade_module_id
            # slash `/` is not needed in manifest file
            @cached_paths[absolute_path] = "#{ASSET_HOST}#{item['file']}" if item.present?
          end
          @cached_paths[absolute_path]
        end
      end
    end
  end
end
