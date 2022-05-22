# typed: strict
# frozen_string_literal: true

module System
  module Enums
    class Locale < BrickGraphQL::BaseEnum
      description 'Represents all IETF BCP47 standard codes supported by the server.'

      Brickdoc::I18n::AVAILABLE_LANGUAGES.to_a.map do |i|
        value(i[0].to_s.upcase.gsub('-', '_'), i[1], value: i[0])
      end
    end
  end
end
