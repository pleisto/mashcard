# frozen_string_literal: true

require 'pathname'
require 'json'

# override some methods from native extension
# It's ignore in zeitwerk auto loader. manual require it.
require_relative 'brickdoc/native_extension_helper'
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
