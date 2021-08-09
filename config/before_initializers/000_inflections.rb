# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format
# (all these examples are active by default):
# ActiveSupport::Inflector.inflections do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
#   inflect.uncountable %w( fish sheep )
# end
#
ActiveSupport::Inflector.inflections do |inflect|
  Packwerk::Inflections::Custom.new(
    Rails.root.join('config', 'inflections.yml')
  ).apply_to(inflect)
end
