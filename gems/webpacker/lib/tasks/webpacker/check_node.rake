# frozen_string_literal: true
require "semantic_range"
namespace :webpacker do
  desc "Verifies if Node.js is installed"
  task :check_node do
    which_command = Gem.win_platform? ? "where" : "which"
    raise Errno::ENOENT if %x(#{which_command} node || #{which_command} nodejs).strip.empty?

    node_version = %x(node -v || nodejs -v).strip
    raise Errno::ENOENT if node_version.blank?

    pkg_path = Pathname.new("#{__dir__}/../../../package.json").realpath
    node_range = JSON.parse(pkg_path.read)["engines"]["node"]
    is_valid = begin
                 SemanticRange.satisfies?(node_version, node_range)
               rescue
                 false
               end
    semver_major = begin
                     node_version[/\d+/]
                   rescue
                     nil
                   end
    is_unstable = begin
                    semver_major.to_i.odd?
                  rescue
                    false
                  end

    if is_unstable
      $stderr.puts "Warning: you are using an unstable release of Node.js (#{node_version})."
    end

    unless is_valid
      $stderr.puts "Webpacker requires Node.js \"#{node_range}\" and you are using #{node_version}"
      $stderr.puts "Please upgrade Node.js https://nodejs.org/en/download/"
      $stderr.puts "Exiting!"
      exit!
    end
  rescue Errno::ENOENT
    $stderr.puts "Node.js not installed. Please download and install Node.js https://nodejs.org/en/download/"
    $stderr.puts "Exiting!"
    exit!
  end
end
