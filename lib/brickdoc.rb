# frozen_string_literal: true

require 'pathname'
module Brickdoc
  def self.root
    Pathname.new File.expand_path('..', __dir__)
  end

  VERSION = File.read(root.join('VERSION')).strip.freeze
  BOOTED_AT = Time.now.freeze
end
