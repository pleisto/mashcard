# frozen_string_literal: true

module BrickGraphQL
  # Find all ruby modules that match the rules
  module Component
    class << self
      def resolver_modules(namespaces)
        find_module_in_namespaces 'Queries', namespaces
      end

      def mutation_modules(namespaces)
        find_module_in_namespaces 'Mutations', namespaces
      end

      def subscription_modules(namespaces)
        find_module_in_namespaces 'Subscriptions', namespaces
      end

      private

      def find_module_in_namespaces(module_name, namespaces)
        # `filter_map` is a shorthand for filter + map in a single call. required Ruby 2.7+.
        namespaces.filter_map do |namespace|
          # Skip all modules that do not contain resolvers.
          next unless namespace.const_defined? module_name

          namespace.const_get module_name
        end
      end
    end
  end
end
