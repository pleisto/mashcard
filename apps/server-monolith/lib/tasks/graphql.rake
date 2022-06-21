# frozen_string_literal: true

require 'graphql/rake_task'
GraphQL::RakeTask.new(schema_name: 'MashcardSchema',
  directory: Mashcard.root.join('db', 'graphql'))
