# frozen_string_literal: true

module Brickdoc
  module DomainDenylist
    extend self

    def all
      return @space_denylist if @space_denylist.present?

      list = YAML.load_file(Brickdoc.root.join('config', 'domain_blacklist.yml'))
      @space_denylist = list[:common] | list[:saas]
    end
  end
end
