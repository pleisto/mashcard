# frozen_string_literal: true

module BrickGraphQL
  class BaseSchema < ::GraphQL::Schema
    DEFAULT_MAX_COMPLEXITY = 200
    AUTHENTICATED_COMPLEXITY = 500
    DEFAULT_MAX_DEPTH = 15
    AUTHENTICATED_MAX_DEPTH = 20

    DEFAULT_MAX_PAGE_SIZE = 30

    max_depth DEFAULT_MAX_DEPTH
    max_complexity DEFAULT_MAX_COMPLEXITY
    default_max_page_size DEFAULT_MAX_PAGE_SIZE

    use ::GraphQL::Batch
    connections.add(ActiveRecord::Relation, ::GraphQL::Pro::PostgresStableRelationConnection)
    disable_introspection_entry_points if Rails.env.production?

    query_analyzer(Plugins::QueryLogger)

    class << self
      # ref: https://graphql-ruby.org/relay/object_identification.html
      def id_from_object(object, _type, _ctx)
        Z85.encode_with_padding("#{object.try(:object_class_name) ||
          object.class.name}$#{ReversibleIntHash.encode(object.id)}")
      end

      def object_from_id(payload, _ctx)
        id, name = Z85.decode_with_padding(payload).split('$')
        name.constantize.find id
      end

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

        # @see ./plugins/entrypoint_validatable.rb
        args[:only] = ->(field, ctx) do
          return true if ctx[:entrypoint].blank? || !(field.class == BrickGraphQL::BaseField)
          entrypoints = field.resolver.try(:requires_entrypoint_to_be)
          return entrypoints.nil? || entrypoints.include?(ctx[:entrypoint])
        end
        super(query_str, args)
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
