# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Groups::Destroy, type: :mutation do
  describe '#resolve' do
    mutation = <<-'TEXT'
      mutation groupDestroy($input: GroupDestroyInput!) {
        groupDestroy(input: $input) {
          errors
        }
      }
    TEXT

    it 'invalid pod' do
      user = create(:accounts_user)
      self.current_user = user

      input = { input: { username: 'foobar' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data['groupDestroy']['errors']).to eq([I18n.t('accounts.errors.invalid_operation_type')])

      self.current_user = nil
    end

    it 'group' do
      user = create(:accounts_user)
      self.current_user = user

      username = 'foobar'
      user.create_own_group!(username: username, display_name: username)

      input = { input: { username: username } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data['groupDestroy']).to eq({ 'errors' => [] })
    end
  end
end
