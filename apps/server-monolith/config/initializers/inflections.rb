# frozen_string_literal: true

require 'yaml'
inflections = YAML.load_file(Rails.root.join('config/inflections.yml'))
ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflections.values.uniq.each do |inflection|
    inflect.acronym inflection
  end
end
