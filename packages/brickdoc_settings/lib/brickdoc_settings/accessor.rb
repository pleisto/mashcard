# frozen_string_literal: true

module BrickdocSettings
  class Accessor
    include BrickdocSettings::AccessorBase

    def initialize(settings, scope: '', domain: '')
      @settings = settings
      @scope = scope
      @domain = domain
    end

    def at(domain)
      @settings.at(domain)
    end

    def with_block(&block)
      block ? instance_eval(&block) : self
    end

    def defined_keys
      @settings.defined_keys(scope: @scope)
    end

    [:field, :get_field, :get, :set, :touch].each do |method_name|
      define_method(method_name) do |key, *args, **options|
        @settings.send(method_name, key, *args, **options.merge(scope: @scope, domain: @domain))
      end
    end
  end
end
