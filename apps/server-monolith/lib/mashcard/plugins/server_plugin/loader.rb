# frozen_string_literal: true

module Mashcard
  module Plugins
    module ServerPlugin
      # Ruby autoloader for server plugins.
      class Loader
        attr_accessor :plugin_dir

        # NOTE: Because mutex of Zeitwerk::Loader is class variable,
        # so can only use delegate and not able to directly inherit
        delegate_missing_to :@zeitwerk_loader

        def initialize
          @zeitwerk_loader = Zeitwerk::Loader.new
        end

        # Append a path to the loader if exists.
        def push_dir(path)
          path = "#{plugin_dir}#{path}"
          @zeitwerk_loader.push_dir(path) if File.directory?(path)
        end
      end
    end
  end
end
