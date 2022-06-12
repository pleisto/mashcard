# frozen_string_literal: true

module Brickdoc
  module DomainDenylist
    extend self

    def all
      return @pod_denylist if @pod_denylist.present?

      list = YAML.load_file(Brickdoc.root.join('config', 'domain_denylist.yml'))
      @pod_denylist = list[:common]
    end
  end
end
