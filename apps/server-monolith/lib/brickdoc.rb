# frozen_string_literal: true

require 'yaml'
require 'zeitwerk'
require 'pathname'
require 'oj'

loader = Zeitwerk::Loader.for_gem
loader.inflector.inflect(YAML.load_file(File.expand_path('../config/inflections.yml', __dir__)))
loader.ignore("#{__dir__}/tasks")
loader.ignore("#{__dir__}/patches")
loader.ignore("#{__dir__}/ext")

loader.setup
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
