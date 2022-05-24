# frozen_string_literal: true

class BrickdocPlugin
  class Loader
    attr_accessor :plugin_dir

    # NOTE: Because mutex of Zeitwerk::Loader is class variable, so can only use delegate and not able to directly inherit
    delegate_missing_to :@zeitwerk_loader

    def initialize
      @zeitwerk_loader = Zeitwerk::Loader.new
    end

    def push_dir(path, namespace: Object)
      path = "#{plugin_dir}#{path}"
      @zeitwerk_loader.push_dir(path, namespace: namespace) if File.directory?(path)
    end
  end
end
