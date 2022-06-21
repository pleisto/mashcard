# frozen_string_literal: true

module Mashcard
  module Settings
    class Accessor
      include Mashcard::Settings::AccessorBase

      def initialize(settings, namespace: '', user_id: nil, pod_id: nil)
        @settings = settings
        @namespace = namespace
        @user_id = user_id
        @pod_id = pod_id
      end

      def at(user_id: nil, pod_id: nil, &block)
        self.class.new(@settings, namespace: @namespace, user_id: user_id, pod_id: pod_id)
          .with_block(&block)
      end

      def namespace(*namespace, &block)
        self.class.new(@settings, namespace: namespace.join('.'), user_id: @user_id, pod_id: @pod_id)
          .with_block(&block)
      end

      def with_block(&block)
        block ? instance_eval(&block) : self
      end

      def defined_keys
        @settings.defined_keys(namespace: @namespace)
      end

      [:field, :get_field, :get, :set, :set_global, :set_all_users_in_pod, :set_all_pods_in_user, :touch].each do |method_name|
        define_method(method_name) do |key, *args, **options|
          @settings.send(method_name, key, *args, **{
            namespace: @namespace,
            user_id: @user_id,
            pod_id: @pod_id,
          }.merge(options))
        end
      end
    end
  end
end
