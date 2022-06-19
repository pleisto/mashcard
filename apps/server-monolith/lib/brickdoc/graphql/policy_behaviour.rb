# frozen_string_literal: true

module Brickdoc
  module GraphQL
    module PolicyBehaviour
      def self.included(base)
        base.include ActionPolicy::GraphQL::Behaviour
        base.extend ClassMethods
      end

      module ClassMethods
        def expose_permissions_field(*rules, field_name: nil,
          prefix: ::ActionPolicy::GraphQL.default_authorization_field_prefix,
          field_options: {}, **options)
          klass_name = graphql_name
          permissions_object = Class.new do
            def initialize(gql_object)
              @gql_object = gql_object
            end
          end

          permissions_type = Class.new(Types::BaseObject) do
            graphql_name "#{klass_name}Permissions"
            rules.each do |rule|
              gql_field_name = field_name || "#{prefix}#{rule.to_s.delete('?')}"

              field gql_field_name,
                ActionPolicy::GraphQL::Types::AuthorizationResult,
                null: false,
                **field_options

              permissions_object.send :define_method, gql_field_name do
                @gql_object.allowance_to(rule, @gql_object.object, **options)
              end
            end
          end

          define_method :permissions do
            permissions_object.new self
          end

          define_singleton_method :permissions_type do
            permissions_type
          end

          field :permissions, permissions_type, null: false
        end
      end
    end
  end
end
