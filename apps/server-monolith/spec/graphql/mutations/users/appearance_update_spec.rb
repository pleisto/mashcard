# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Users::AppearanceUpdate, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation userAppearanceUpdate($input: UserAppearanceUpdateInput!) {
        userAppearanceUpdate(input: $input) {
          errors
        }
      }
    TEXT

    it 'ok' do
      user = create(:accounts_user)
      self.current_user = user

      timezone = 'WET'

      expect(user.timezone).not_to eq(timezone)

      input = { input: { timezone: timezone, locale: '' } }
      graphql_execute(mutation, input)

      expect(response.success?).to be true
      expect(response.data['userAppearanceUpdate']).to eq({ 'errors' => [] })

      expect(user.timezone).to eq(timezone)
      self.current_user = nil
    end
  end
end
