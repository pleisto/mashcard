# frozen_string_literal: true
require "semantic_range"
namespace :webpacker do
  desc "Verifies if Yarn is installed"
  task :check_yarn do
    which_command = Gem.win_platform? ? "where" : "which"
    raise Errno::ENOENT if %x(#{which_command} yarn).strip.empty?

    yarn_version = %x(yarn --version).strip
    raise Errno::ENOENT if yarn_version.blank?

    pkg_path = Pathname.new("#{__dir__}/../../../package.json").realpath
    yarn_range = JSON.parse(pkg_path.read)["engines"]["yarn"]
    is_valid = begin
                 SemanticRange.satisfies?(yarn_version, yarn_range)
               rescue
                 false
               end
    is_unsupported = begin
                       SemanticRange.satisfies?(yarn_version, ">=4.0.0")
                     rescue
                       false
                     end

    unless is_valid
      $stderr.puts "Webpacker requires Yarn \"#{yarn_range}\" and you are using #{yarn_version}"
      if is_unsupported
        $stderr.puts "This version of Webpacker does not support Yarn #{yarn_version}."
      else
        $stderr.puts "Please upgrade Yarn https://yarnpkg.com/lang/en/docs/install/"
      end
      $stderr.puts "Exiting!"
      exit!
    end
  rescue Errno::ENOENT
    $stderr.puts "Yarn not installed. Please download and install Yarn from https://yarnpkg.com/lang/en/docs/install/"
    $stderr.puts "Exiting!"
    exit!
  end
end
