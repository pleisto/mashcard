# frozen_string_literal: true

module Brickdoc
  module WebidBlacklist
    extend self

    def all
      return @pod_blacklist if @pod_blacklist.present?
      list = YAML.load_file(Brickdoc.root.join('config', 'webid_blacklist.yml'))
      @pod_blacklist = list[:common] | list[:saas]
    end
  end
end
