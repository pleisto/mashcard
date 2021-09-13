# frozen_string_literal: true
SimpleCov.start 'rails' do
  add_group "GraphQL", "app/graphql"
  enable_coverage :branch
  if ENV['CI'] == "true"
    require 'simplecov-lcov'
    SimpleCov::Formatter::LcovFormatter.config.report_with_single_file = true
    formatter SimpleCov::Formatter::LcovFormatter
  end
end
