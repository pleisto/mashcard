# frozen_string_literal: true
require "webpacker/version"

namespace :webpacker do
  desc "Provide information on Webpacker's environment"
  task :info do
    Dir.chdir(Rails.root) do
      $stdout.puts "Ruby: #{%x(ruby --version)}"
      $stdout.puts "Rails: #{Rails.version}"
      $stdout.puts "Webpacker: #{Webpacker::VERSION}"
      $stdout.puts "Node: #{%x(node --version)}"
      $stdout.puts "Yarn: #{%x(yarn --version)}"

      $stdout.puts "\n"
      $stdout.puts "@brickdoc/webpacker: \n#{%x(npm list @brickdoc/webpacker version)}"

      $stdout.puts "Is bin/webpack present?: #{File.exist? 'bin/webpack'}"
      $stdout.puts "Is bin/webpack-dev-server present?: #{File.exist? 'bin/webpack-dev-server'}"
      $stdout.puts "Is bin/yarn present?: #{File.exist? 'bin/yarn'}"
    end
  end
end
