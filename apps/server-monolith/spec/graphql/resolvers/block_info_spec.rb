# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::BlockInfo, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetBlockInfo($id: String!, $domain: String!) {
        blockInfo(id: $id, domain: $domain) {
          title
          enabledAlias {
            key
            payload
          }
          icon {
            ... on BlockImage {
              type
              source
              key
              height
              width
            }

            ... on BlockEmoji {
              type
              name
              emoji
            }
          }
          isDeleted
          isMaster
          pin
          id
          permission {
            key
            policy
            state
          }
          pathArray {
            id
            text
            icon {
              ... on BlockImage {
                type
                source
                key
                height
                width
              }

              ... on BlockEmoji {
                type
                name
                emoji
              }
            }
          }
          collaborators {
            name
            domain
            email
            avatarData {
              url
            }
          }
        }
      }
    GRAPHQL

    it 'whole' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' =>
      {
        'title' => block.title,
        'collaborators' => [],
        'pin' => false,
        'enabledAlias' => nil,
        'isDeleted' => false,
        'pathArray' => [],
        'icon' => nil,
        'permission' => nil,
        'id' => block.id,
        'isMaster' => true,
      } })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'last domain and last block_id' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context

      expect(user.last_pod_domain).to be_nil
      expect(user.last_block_ids).to eq({})

      block = create(:docs_block, pod: pod, collaborators: [user.id])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })

      user.reload

      expect(user.last_pod_domain).to eq(user.domain)
      expect(user.last_block_ids).to eq({ user.domain => block.id })
    end

    it 'deleted' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['isDeleted']).to be(false)

      block.soft_delete!
      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['isDeleted']).to be(true)

      block.restore!
      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['isDeleted']).to be(false)

      block.soft_delete!
      block.hard_delete!
      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => nil })

      self.current_user = nil
      self.current_pod = nil
    end

    it 'self pin' do
      user = create(:accounts_user)
      self.current_user = user
      pod = user.personal_pod
      self.current_pod = pod.as_session_context
      block = create(:docs_block, pod: pod, collaborators: [user.id])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['pin']).to be(false)

      pin = Docs::Pin.create!(user_id: user.id, pod_id: pod.id, block_id: block.id)

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['pin']).to be(true)

      pin.update!(deleted_at: Time.current)

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['pin']).to be(false)

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

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      block.upsert_share_links!([domain: user.domain, state: 'enabled', policy: 'view'])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('view')

      block.upsert_share_links!([domain: user.domain, state: 'disabled', policy: 'view'])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      self.current_user = nil
      self.current_pod = nil
    end

    it 'share anyone' do
      owner = create(:accounts_user)
      user = create(:accounts_user)
      pod = user.personal_pod
      self.current_pod = Pod::ANONYMOUS_CONTEXT

      block = create(:docs_block, pod: owner.personal_pod, collaborators: [owner.id])
      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => nil })

      block.upsert_share_links!([domain: Pod::ANYONE_DOMAIN, state: 'enabled', policy: 'edit'])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('edit')

      block.upsert_share_links!([domain: Pod::ANYONE_DOMAIN, state: 'disabled', policy: 'edit'])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      self.current_user = user
      self.current_pod = pod.as_session_context

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      block.upsert_share_links!([domain: Pod::ANYONE_DOMAIN, state: 'enabled', policy: 'edit'])

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
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

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['enabledAlias']).to be_nil

      a = block.aliases.create!(alias: 'foo_bar', payload: { 'key' => 'baz' })
      graphql_execute(query, { id: 'foo_bar', domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['enabledAlias']).to eq({ 'key' => 'foo_bar', 'payload' => { 'key' => 'baz' } })

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['enabledAlias']).to eq({ 'key' => 'foo_bar', 'payload' => { 'key' => 'baz' } })

      a.disabled!

      graphql_execute(query, { id: block.id, domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['enabledAlias']).to be_nil

      graphql_execute(query, { id: 'foo_bar', domain: block.pod.domain })
      expect(response.success?).to be true
      expect(response.data).to eq('blockInfo' => nil)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
