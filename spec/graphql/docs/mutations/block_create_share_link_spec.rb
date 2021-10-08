# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockCreateShareLink, type: :mutation do
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
      self.current_pod = user.personal_pod.as_session_context

      input = { input: { id: block.id, target: [{ policy: "view", state: "enabled", webid: Pod::ANYONE_WEBID }] } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to eq(true)
      expect(response.data).to eq({ 'blockCreateShareLink' => nil })

      input = { input: { id: block.id, target: [{ policy: "edit", state: "enabled", webid: share_user.webid }] } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to eq(true)
      expect(response.data).to eq({ 'blockCreateShareLink' => nil })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'error' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      input = { input: { id: block.id, target: [{ policy: "view", state: "enabled", webid: "foobar" }] } }
      internal_graphql_execute(mutation, input)
      expect(response.success?).to eq(false)
      expect(response.errors[0]['message']).to include(I18n.t("errors.messages.webid_presence_invalid"))

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
