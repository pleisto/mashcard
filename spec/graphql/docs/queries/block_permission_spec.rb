# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::BlockPermission, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockPermission($id: String!) {
        blockPermission(id: $id) {
          key
          policy
          state
        }
      }
    GRAPHQL

    it 'self' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockPermission' => nil })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'share normal user' do
      owner = create(:accounts_user)

      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context

      block = create(:docs_block, pod: owner.personal_pod, collaborators: [owner.id])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockPermission' => nil })

      block.upsert_share_links!([webid: user.webid, state: 'enabled', policy: 'view'])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockPermission']['policy']).to eq('view')

      self.current_user = nil
      self.current_pod = nil
    end

    it 'share anyone' do
      owner = create(:accounts_user)

      user = create(:accounts_user)
      pod = user.personal_pod

      self.current_pod = Pod::ANONYMOUS_CONTEXT

      block = create(:docs_block, pod: owner.personal_pod, collaborators: [owner.id])
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockPermission' => nil })

      block.upsert_share_links!([webid: Pod::ANYONE_WEBID, state: 'enabled', policy: 'edit'])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockPermission']['policy']).to eq('edit')

      self.current_user = user
      self.current_pod = pod.as_session_context

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockPermission']['policy']).to eq('edit')

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
