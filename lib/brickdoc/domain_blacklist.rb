# frozen_string_literal: true

module Brickdoc
  module DomainBlacklist
    extend self

    def all
      return @space_blacklist if @space_blacklist.present?
      list = YAML.load_file(Brickdoc.root.join('config', 'domain_blacklist.yml'))
      @space_blacklist = list[:common] | list[:saas]
    end
  end
end
