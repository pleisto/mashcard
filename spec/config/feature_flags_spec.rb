# frozen_string_literal: true

require 'rails_helper'

describe Flipper do
  it 'all feature flags should be explicitly declared in config/feature_flags.yml' do
    # Ensure feature flags are explicitly declared in the configuration file.
    available_flags = YAML.parse_file(Brickdoc.root.join('config', 'feature_flags.yml')).to_ruby.map { |i| i['name'] }
    unknown_flags = (Flipper.features.to_a - available_flags)
    expect(unknown_flags).to be_empty
  end
end
