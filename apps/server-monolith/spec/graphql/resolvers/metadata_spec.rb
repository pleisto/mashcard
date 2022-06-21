# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::Metadata, type: :query do
  describe '#resolver' do
    it 'works' do
      query = <<-'GRAPHQL'
        {
          metadata {
            id
            availableLocales {
              label
              value
            }
          }
        }
      GRAPHQL
      graphql_execute(query)
      expect(response.success?).to be true
      expect(response.data['metadata']['availableLocales']
               .map { |l| l['label'] }).to eq(Mashcard::I18n::AVAILABLE_LANGUAGES.values)
    end
  end
end
