# frozen_string_literal: true
module System
  module Objects
    class BrickdocMetadata < BrickGraphQL::BaseObject
      graphql_name 'metadata'
      description 'Represents information about the Brickdoc Server Instance.'
      has_primary_key

      field :available_locales, [BrickdesignSelectOption], 'Current available locales.', null: false
      field :config, BrickdocConfig, 'Brickdoc Global Config', null: false

      def available_locales
        Brickdoc::I18n::AVAILABLE_LANGUAGES.map { |k, v| { label: v, value: k } }
      end

      def config
        ::BrickdocConfig
      end
    end
  end
end
