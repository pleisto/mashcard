# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockCreateShareLink, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockCreateShareLink($input: BlockCreateShareLinkInput!) {
        blockCreateShareLink(input: $input) {
          errors
          shareLink {
            key
          }
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }
    let(:share_user) { create(:accounts_user) }
    let(:block) do
      root = create(:docs_block, pod: user.personal_pod)
      create(:docs_block, pod: user.personal_pod, sort: 100, parent: root)
      create(:docs_block, pod: user.personal_pod, sort: 200, parent: root)
      create(:docs_block, pod: user.personal_pod, sort: 300, parent: root)
      root
    end

    it 'pod' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      input = { input: { id: block.id, policy: "SHOW", shareType: "POD", webids: ["UNKNOWN"] } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data['blockCreateShareLink']['errors'][0]).to eq(I18n.t('accounts.errors.pod_not_exist'))
      expect(response.data['blockCreateShareLink']['shareLink']).to eq(nil)

      input = { input: { id: block.id, policy: "SHOW", shareType: "POD", webids: [share_user.personal_pod.webid] } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data['blockCreateShareLink']['errors']).to eq([])
      expect(response.data['blockCreateShareLink']['shareLink']['key']).to_not eq(nil)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'user' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      input = { input: { id: block.id, policy: "SHOW", shareType: "USER", emails: ["UNKNOWN"] } }
      internal_graphql_execute(mutation, input)
      expect(response.data).to eq({})
      expect(response.errors[0]['message']).to include("is not a valid email address")

      input = { input: { id: block.id, policy: "SHOW", shareType: "USER", emails: ["UNKNOWN@brickdoc.com"] } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data['blockCreateShareLink']['errors'][0]).to eq(I18n.t('accounts.errors.user_not_exist'))
      expect(response.data['blockCreateShareLink']['shareLink']).to eq(nil)

      input = { input: { id: block.id, policy: "SHOW", shareType: "USER", emails: [share_user.email] } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data['blockCreateShareLink']['errors']).to eq([])
      expect(response.data['blockCreateShareLink']['shareLink']['key']).to_not eq(nil)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'everyone' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      input = { input: { id: block.id, policy: "SHOW", shareType: "EVERYONE" } }
      internal_graphql_execute(mutation, input)

      expect(response.errors).to eq({})
      expect(response.data['blockCreateShareLink']['errors']).to eq([])
      expect(response.data['blockCreateShareLink']['shareLink']['key']).to_not eq(nil)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'error' do
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      input = { input: { id: block.id, policy: "SHOW", shareType: "POD" } }
      internal_graphql_execute(mutation, input)

      expect(response.errors[0]['message']).to include("Webid is empty!")
      expect(response.data['blockCreateShareLink']).to eq(nil)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
