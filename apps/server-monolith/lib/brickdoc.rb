# frozen_string_literal: true

require 'pathname'
require 'oj'
module Brickdoc
  def self.root
    Pathname.new File.expand_path('..', __dir__)
  end

  def self.monorepo_root
    Pathname.new File.expand_path('../../..', __dir__)
  end

  VERSION = Oj.load(File.read(root.join('package.json')))['version'].freeze
  BOOTED_AT = Time.now.utc.freeze
end
