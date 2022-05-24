# frozen_string_literal: true

# Add all fields for modules as resolvers, mutations or subscriptions.
module AutoGraphQLFields
  extend ActiveSupport::Concern

  module ClassMethods
    def add_fields_for(modules, type)
      modules.each do |m|
        m.constants.select { |x| !x.end_with? 'Test' }.map { |name| m.const_get(name) }
          .each { |r| field(r.graphql_name.camelcase(:lower), type => r) }
      end
    end
  end
end
