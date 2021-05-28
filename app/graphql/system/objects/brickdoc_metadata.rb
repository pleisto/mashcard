# frozen_string_literal: true
module System
  module Objects
    class BrickdocMetadata < BrickGraphQL::BaseObject
      graphql_name 'metadata'
      description 'Represents information about the Brickdoc Server Instance.'
      global_id_field :id

      field :available_locales, [BrickdesignSelectOption], 'Current available locales.', null: false
      field :self_hosted, Boolean, 'is self hosted instance', null: false

      def self_hosted
        Brickdoc::Runtime.self_hosted?
      end

      def available_locales
        Brickdoc::I18n::AVAILABLE_LANGUAGES.map { |k, v| { label: v, value: k } }
      end
    end
  end
end
