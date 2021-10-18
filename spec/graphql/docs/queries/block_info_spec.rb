# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::BlockInfo, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockInfo($id: String!, $kind: BlockIDKind!, $webid: String!) {
        blockInfo(id: $id, kind: $kind, webid: $webid) {
          title
          isDeleted
          pin
          id
          payload
          permission {
            key
            policy
            state
          }
          collaborators {
            name
            webid
            email
            avatarData {
              url
            }
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

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

      block.soft_delete!
      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => true,
                                                     "permission" => nil, 'id' => block.id } })

      block.restore!
      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

      block.soft_delete!
      block.hard_delete!
      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
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

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'self pin' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

      pin = Docs::Pin.create!(user_id: user.id, pod_id: pod.id, block_id: block.id)

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => true,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

      pin.update!(deleted_at: Time.current)

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

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

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

      block.upsert_share_links!([webid: user.webid, state: 'enabled', policy: 'view'])

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
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
      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                     "payload" => {}, "isDeleted" => false,
                                                     "permission" => nil, 'id' => block.id } })

      block.upsert_share_links!([webid: Pod::ANYONE_WEBID, state: 'enabled', policy: 'edit'])

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('edit')

      self.current_user = user
      self.current_pod = pod.as_session_context

      internal_graphql_execute(query, { id: block.id, kind: 'p', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('edit')

      self.current_user = nil
      self.current_pod = nil
    end

    it 'alias' do
      user = create(:accounts_user)
      pod = user.personal_pod
      self.current_user = user
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod)

      internal_graphql_execute(query, { id: block.id, kind: 'a', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq('blockInfo' => nil)

      a = block.create_alias!("foo_bar")
      internal_graphql_execute(query, { id: "foo_bar", kind: 'a', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq('blockInfo' => { "title" => block.title, "collaborators" => [], "pin" => false,
                                                   "payload" => {}, "isDeleted" => false,
                                                   "permission" => nil, 'id' => block.id })

      a.disabled!

      internal_graphql_execute(query, { id: "foo_bar", kind: 'a', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq('blockInfo' => nil)

      a.enabled!

      self.current_pod = Pod::ANONYMOUS_CONTEXT
      self.current_user = nil

      internal_graphql_execute(query, { id: block.id, kind: 'a', webid: block.pod.webid })
      expect(response.success?).to be true
      expect(response.data).to eq('blockInfo' => nil)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
