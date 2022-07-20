# frozen_string_literal: true

require 'rails_helper'

describe Mutations::Blocks::CreateShareLink, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockCreateShareLink($input: BlockCreateShareLinkInput!) {
        blockCreateShareLink(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) { create(:docs_block, pod: user.personal_pod) }

    it 'work' do
      self.current_user = user

      input = { input: { id: block.id, target: [{ policy: 'view', state: 'enabled', domain: Pod::ANYONE_DOMAIN }] } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(true)
      expect(response.data).to eq({ 'blockCreateShareLink' => nil })

      input = { input: { id: block.id, target: [{ policy: 'edit', state: 'enabled', domain: share_user.domain }] } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(true)
      expect(response.data).to eq({ 'blockCreateShareLink' => nil })

      self.current_user = nil
    end

    it 'error' do
      self.current_user = user

      input = { input: { id: block.id, target: [{ policy: 'view', state: 'enabled', domain: 'foobar' }] } }
      graphql_execute(mutation, input)
      expect(response.success?).to be(false)
      expect(response.errors[0]['message']).to include(I18n.t('errors.messages.domain_presence_invalid'))

      self.current_user = nil
    end
  end
end
