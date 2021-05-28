# frozen_string_literal: true

require 'pathname'
module Brickdoc
  def self.root
    Pathname.new File.expand_path('..', __dir__)
  end

  VERSION = File.read(root.join('VERSION')).strip.freeze
  BOOTED_AT = Time.now.freeze

  class << self
    def full_version
      @full_version ||= if ENV['BRICKDOC_BUILD']
        "#{VERSION} build #{ENV['BRICKDOC_BUILD']}"
      else
        "#{VERSION}-snapshot"
      end
    end

    def saas?
      @is_saas ||= Module.const_defined?('Brickdoc::SaaS') && ENV['SELF_HOSTED_MODE'].blank?
    end

    def self_hosted?
      !saas?
    end

    def saas_only
      yield if saas?
    end

    def self_hosted_only
      yield if self_hosted?
    end
  end
end
