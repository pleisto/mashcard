# frozen_string_literal: true

require_relative '../mashcard_ext'
require 'fast_underscore'
require_relative 'array'
require_relative 'string'
require_relative 'hash'

# Do not include the rails patches here, ext.rb will be loaded by `config/boot.rb`
Hash.prepend Patches::Hash
String.prepend Patches::String
Array.prepend Patches::Array
