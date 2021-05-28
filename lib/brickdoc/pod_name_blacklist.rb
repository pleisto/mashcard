# frozen_string_literal: true

module Brickdoc
  module PodNameBlacklist
    extend self

    def all
      return @pod_blacklist if @pod_blacklist.present?
      list = YAML.load_file(Brickdoc.root.join('config', 'podname_blacklist.yml'))
      @pod_blacklist = Brickdoc.saas? ? (list[:common] | list[:saas]) : list[:common]
    end
  end
end
