# frozen_string_literal: true
module Webpacker
  class Runner
    def self.run(argv)
      $stdout.sync = true

      new(argv).run
    end

    def initialize(argv)
      @argv = argv

      @app_path              = File.expand_path(".", Dir.pwd)
      @node_modules_bin_path = ENV["WEBPACKER_NODE_MODULES_BIN_PATH"] || %x(yarn bin).chomp
      @webpack_config        = File.join(@app_path, "config/webpack/#{ENV['NODE_ENV']}.js")
      @webpacker_config      = ENV["WEBPACKER_CONFIG"] || File.join(@app_path, "config/webpacker.yml")

      unless File.exist?(@webpack_config)
        $stderr.puts "webpack config #{@webpack_config} not found."
        exit!
      end
    end
  end
end
