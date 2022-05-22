# typed: true
# frozen_string_literal: true

require 'pathname'
require 'json'
module Brickdoc
  def self.root
    Pathname.new File.expand_path('..', __dir__)
  end

  def self.monorepo_root
    Pathname.new File.expand_path('../../..', __dir__)
  end

  VERSION = JSON.parse(File.read(root.join('package.json')))['version'].freeze
  BOOTED_AT = Time.now.utc.freeze
end
