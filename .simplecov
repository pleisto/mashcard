# frozen_string_literal: true
SimpleCov.start 'rails' do
  add_group "GraphQL", "app/graphql"
  enable_coverage :branch
  coverage_dir "coverage/rspec"
  if ENV['CI'] == "true"
    require 'simplecov-lcov'
    SimpleCov::Formatter::LcovFormatter.config.report_with_single_file = true
    formatter SimpleCov::Formatter::LcovFormatter
  end
end
