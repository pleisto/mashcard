# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Pods::UpdateDomain, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation updateDomain($input: UpdateDomainInput!) {
        updateDomain(input: $input) {
          errors
        }
      }
    GRAPHQL

    it 'invalid pod' do
      user = create(:accounts_user)
      self.current_user = user

      input = { input: { domain: 'unknown', newDomain: 'unknown123' } }
      graphql_execute(mutation, input)
      expect(response.success?).to be true
      expect(response.data['updateDomain']['errors']).to eq([I18n.t('accounts.errors.pod_not_exist')])

      self.current_user = nil
    end

    it 'ok' do
      user = create(:accounts_user)
      self.current_user = user

      username = 'UpdateDomain'
      group = user.create_own_group!(username: username, display_name: username)

      new_domain = "new#{group.id}"

      input = { input: { domain: username, newDomain: new_domain } }
      graphql_execute(mutation, input)

      expect(response.success?).to be true
      expect(response.data['updateDomain']).to eq({ 'errors' => [] })

      group.reload
      expect(group.username).to eq(new_domain)
      self.current_user = nil
    end
  end
end
