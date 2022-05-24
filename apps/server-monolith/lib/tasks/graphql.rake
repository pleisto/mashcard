# frozen_string_literal: true

require 'graphql/rake_task'
GraphQL::RakeTask.new(schema_name: 'BrickdocSchema',
  directory: Brickdoc.root.join('db', 'graphql'))
