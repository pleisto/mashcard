# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::BlockInfo, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockInfo($id: String!) {
        blockInfo(id: $id) {
          title
          isDeleted
          permission {
            key
            policy
            state
          }
        }
      }
    GRAPHQL

    it 'deleted' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "isDeleted" => false, "permission" => nil } })

      block.soft_delete!
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "isDeleted" => true, "permission" => nil } })

      block.restore!
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "isDeleted" => false, "permission" => nil } })

      block.soft_delete!
      block.hard_delete!
      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => nil })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'self' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "isDeleted" => false, "permission" => nil } })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'share normal user && deleted' do
      owner = create(:accounts_user)

      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context

      block = create(:docs_block, pod: owner.personal_pod, collaborators: [owner.id])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "isDeleted" => false, "permission" => nil } })

      block.upsert_share_links!([webid: user.webid, state: 'enabled', policy: 'view'])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('view')

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
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "isDeleted" => false, "permission" => nil } })

      block.upsert_share_links!([webid: Pod::ANYONE_WEBID, state: 'enabled', policy: 'edit'])

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('edit')

      self.current_user = user
      self.current_pod = pod.as_session_context

      internal_graphql_execute(query, { id: block.id })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('edit')

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
