# frozen_string_literal: true

class BrickdocSchema < ::GraphQL::Schema
  # Current introspection complexity is 187.  Make sure DEFAULT_MAX_COMPLEXITY is at greater than this.
  DEFAULT_MAX_COMPLEXITY = 200
  AUTHENTICATED_COMPLEXITY = 300
  DEFAULT_MAX_DEPTH = 15
  AUTHENTICATED_MAX_DEPTH = 20
  DEFAULT_MAX_PAGE_SIZE = 100

  max_depth DEFAULT_MAX_DEPTH
  max_complexity DEFAULT_MAX_COMPLEXITY
  default_max_page_size DEFAULT_MAX_PAGE_SIZE

  validate_max_errors 5
  validate_timeout 0.2.seconds

  use GraphQL::FragmentCache
  use GraphQL::Subscriptions::ActionCableSubscriptions

  tracer GraphQL::Tracing::ActiveSupportNotificationsTracing

  query_analyzer Brickdoc::GraphQL::QueryAnalyzers::LoggerAnalyzer

  query Types::QueryType
  mutation Types::MutationType
  subscription Types::SubscriptionType

  class << self
    def multiplex(queries, **kwargs)
      kwargs[:max_complexity] ||= max_query_complexity(kwargs[:context]) unless kwargs.key?(:max_complexity)

      queries.each do |query|
        query[:max_complexity] ||= max_query_complexity(query[:context]) unless query.key?(:max_complexity)
        query[:max_depth] = max_query_depth(query[:context]) unless query.key?(:max_depth)
      end

      super(queries, **kwargs)
    end

    def max_query_complexity(ctx)
      current_user = ctx&.fetch(:current_user, nil)
      current_user.present? ? AUTHENTICATED_COMPLEXITY : DEFAULT_MAX_COMPLEXITY
    end

    def max_query_depth(ctx)
      current_user = ctx&.fetch(:current_user, nil)
      current_user.present? ? AUTHENTICATED_MAX_DEPTH : DEFAULT_MAX_DEPTH
    end
  end
end
