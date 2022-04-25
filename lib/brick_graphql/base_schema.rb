# frozen_string_literal: true

module BrickGraphQL
  class BaseSchema < ::GraphQL::Schema
    DEFAULT_MAX_COMPLEXITY = 200
    AUTHENTICATED_COMPLEXITY = 300
    DEFAULT_MAX_DEPTH = 15
    AUTHENTICATED_MAX_DEPTH = 20

    DEFAULT_MAX_PAGE_SIZE = 100

    max_depth DEFAULT_MAX_DEPTH
    max_complexity DEFAULT_MAX_COMPLEXITY
    default_max_page_size DEFAULT_MAX_PAGE_SIZE

    use GraphQL::FragmentCache
    # connections.add(ActiveRecord::Relation, ::GraphQL::Pro::PostgresStableRelationConnection)

    query_analyzer(Concerns::QueryLogger)

    class << self
      def multiplex(queries, **args)
        args[:max_complexity] ||= max_query_complexity(args[:context])

        queries.each do |query|
          query[:max_depth] = max_query_depth(args[:context])
        end

        super(queries, **args)
      end

      def execute(query_str = nil, **args)
        args[:max_complexity] ||= max_query_complexity(args[:context])
        args[:max_depth] ||= max_query_depth(args[:context])

        # Remove entrypoint mismatched fields
        # @see ./concerns/entrypoint_validatable.rb
        args[:only] = ->(field, ctx) do
          # Skip this filter if there is no `entrypoint` in the context
          return true if ctx[:entrypoint].blank? || !(field.class == BrickGraphQL::BaseField)

          entrypoints = field.resolver.try(:requires_entrypoint_to_be)
          return entrypoints.nil? || entrypoints.include?(ctx[:entrypoint])
        end
        super(query_str, **args)
      end

      def max_query_complexity(ctx)
        return 1_000 if ctx[:entrypoint].blank? # rake graphql:schema:dump
        current_user = ctx&.fetch(:current_user, nil)
        current_user.present? ? AUTHENTICATED_COMPLEXITY : DEFAULT_MAX_COMPLEXITY
      end

      def max_query_depth(ctx)
        current_user = ctx&.fetch(:current_user, nil)
        current_user.present? ? AUTHENTICATED_MAX_DEPTH : DEFAULT_MAX_DEPTH
      end
    end
  end
end
