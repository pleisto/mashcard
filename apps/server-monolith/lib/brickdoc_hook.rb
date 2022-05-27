# frozen_string_literal: true

class BrickdocHook
  @hooks = {}
  @enabled_namespaces = []

  class << self
    attr_reader :hooks
    attr_accessor :enabled_namespaces

    def on(hook_name, namespace: '', &block)
      hook_name = hook_name.to_sym
      @hooks[hook_name] ||= []
      @hooks[hook_name].push(namespace: namespace, block: block)
    end

    def off(hook_name, namespace: '', &block)
      hook_name = hook_name.to_sym
      if @hooks[hook_name]
        @hooks[hook_name] = @hooks[hook_name].reject do |h|
          (h[:namespace] == namespace) && (block.nil? || (h[:block] == block))
        end
      end
    end

    def trigger(hook_name, *params)
      @hooks[hook_name]&.each do |h|
        h[:block].call(*params) if @enabled_namespaces.include?(h[:namespace])
      end
    end

    def eval_with(hook_name, object)
      @hooks[hook_name]&.each do |h|
        object.instance_eval(&h[:block]) if @enabled_namespaces.include?(h[:namespace])
      end
    end
  end
end
