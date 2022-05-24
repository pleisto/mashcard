# frozen_string_literal: true

class BrickdocHook
  @hooks = {}
  @enabled_scopes = []

  class << self
    attr_reader :hooks
    attr_accessor :enabled_scopes

    def on(hook_name, scope: '', &block)
      hook_name = hook_name.to_sym
      @hooks[hook_name] ||= []
      @hooks[hook_name].push(scope: scope, block: block)
    end

    def off(hook_name, scope: '', &block)
      hook_name = hook_name.to_sym
      if @hooks[hook_name]
        @hooks[hook_name] = @hooks[hook_name].reject do |h|
          (h[:scope] == scope) && (block.nil? || (h[:block] == block))
        end
      end
    end

    def trigger(hook_name, *params)
      @hooks[hook_name]&.each do |h|
        h[:block].call(*params) if @enabled_scopes.include?(h[:scope])
      end
    end

    def eval_with(hook_name, object)
      @hooks[hook_name]&.each do |h|
        object.instance_eval(&h[:block]) if @enabled_scopes.include?(h[:scope])
      end
    end
  end
end
