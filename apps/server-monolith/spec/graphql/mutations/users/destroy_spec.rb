# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Groups::Destroy, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation UserDestroy($input: UserDestroyInput!) {
        userDestroy(input: $input) {
          errors
        }
      }
    TEXT

    it 'group' do
      user = create(:accounts_user)
      self.current_user = user

      username = 'foobar'
      user.create_own_group!(username: username, display_name: username)

      input = { input: {} }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data['userDestroy']).to eq({ 'errors' => [I18n.t('errors.messages.delete_disabled_because_group_pods')] })
    end

    it 'ok' do
      user = create(:accounts_user)
      self.current_user = user

      input = { input: {} }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data['userDestroy']).to eq({ 'errors' => [] })
    end
  end
end
