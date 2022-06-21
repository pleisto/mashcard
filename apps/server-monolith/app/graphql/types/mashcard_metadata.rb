# frozen_string_literal: true

module Types
  class MashcardMetadata < Types::BaseObject
    graphql_name 'Metadata'
    description 'Represents information about the MashCard Server Instance.'
    has_primary_key

    field :available_locales, [BrickdesignSelectOption], 'Current available locales.', null: false
    field :available_timezones, [String], null: false
    field :config, Types::MashcardConfig, 'MashCard Global Config', null: false

    def available_locales
      Mashcard::I18n::AVAILABLE_LANGUAGES.map { |k, v| { label: v, value: k } }
    end

    def available_timezones
      TZInfo::Timezone.all_identifiers
    end

    def config
      ::MashcardConfig
    end
  end
end
