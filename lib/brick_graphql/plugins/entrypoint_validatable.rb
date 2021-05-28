# frozen_string_literal: true

module BrickGraphQL
  # The entrypoint plugin can restrict the query or mutation to be called only within a specific entrypoint.
  # @see https://graphql-ruby.org/queries/executing_queries.html#context
  module Plugins::EntrypointValidatable
    extend ActiveSupport::Concern

    def current_entrypoint
      context[:entrypoint]
    end

    class_methods do
      def requires_entrypoint_to_be(entrypoints = nil)
        if entrypoints.nil?
          @allow_entrypoints
        else
          @allow_entrypoints = entrypoints.is_a?(Array) ? entrypoints : [entrypoints]
        end
      end

      def description(desc = nil)
        # @see https://github.com/rmosolgo/graphql-ruby/blob/master/lib/graphql/schema/member/base_dsl_methods.rb#L46
        desc = @description if desc.nil?
        desc = "#{desc}\nRequired `context[:entrypoints]` is `#{@allow_entrypoints}`." if @allow_entrypoints.present?
        super(desc)
      end
    end
  end
end
