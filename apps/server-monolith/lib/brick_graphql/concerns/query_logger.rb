# typed: true
# frozen_string_literal: true

module BrickGraphQL
  module Concerns
    class QueryLogger < ::GraphQL::Analysis::AST::QueryComplexity
      def initialize(subject)
        @max_depth = 0
        @current_depth = 0
        super
      end

      def on_enter_field(node, parent, visitor)
        super
        return if visitor.skipping? || visitor.visiting_fragment_definition?

        @current_depth += 1
      end

      def on_leave_field(node, parent, visitor)
        super
        return if visitor.skipping? || visitor.visiting_fragment_definition?

        if @max_depth < @current_depth
          @max_depth = @current_depth
        end
        @current_depth -= 1
      end

      def result
        complexity = super
        Rails.logger.info({
          event: 'graphql.query',
          complexity: complexity,
          depth: @max_depth,
          ip: query.context[:real_ip],
          entrypoint: query.context[:entrypoint],
          query: query.query_string.squish,
          current_user_id: query.context[:current_user]&.id,
          operation_name: query.operation_name,
          analysis_errors: query.analysis_errors,
          request_id: query.context[:request_id],
        })
      end
    end
  end
end
