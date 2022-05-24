# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::BlockInfo, type: :query do
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
      space = user.personal_space
      self.current_space = space.as_session_context
      block = create(:docs_block, space: space, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
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
      self.current_space = nil
    end

    it 'last domain and last block_id' do
      user = create(:accounts_user)
      self.current_user = user
      space = user.personal_space
      self.current_space = space.as_session_context

      expect(user.last_space_domain).to be_nil
      expect(user.last_block_ids).to eq({})

      block = create(:docs_block, space: space, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })

      user.reload

      expect(user.last_space_domain).to eq(user.domain)
      expect(user.last_block_ids).to eq({ user.domain => block.id })
    end

    it 'deleted' do
      user = create(:accounts_user)
      self.current_user = user
      space = user.personal_space
      self.current_space = space.as_session_context
      block = create(:docs_block, space: space, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['isDeleted']).to be(false)

      block.soft_delete!
      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['isDeleted']).to be(true)

      block.restore!
      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['isDeleted']).to be(false)

      block.soft_delete!
      block.hard_delete!
      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => nil })

      self.current_user = nil
      self.current_space = nil
    end

    it 'self pin' do
      user = create(:accounts_user)
      self.current_user = user
      space = user.personal_space
      self.current_space = space.as_session_context
      block = create(:docs_block, space: space, collaborators: [user.id])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['pin']).to be(false)

      pin = Docs::Pin.create!(user_id: user.id, space_id: space.id, block_id: block.id)

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['pin']).to be(true)

      pin.update!(deleted_at: Time.current)

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['pin']).to be(false)

      self.current_user = nil
      self.current_space = nil
    end

    it 'share normal user && deleted' do
      owner = create(:accounts_user)

      user = create(:accounts_user)
      self.current_user = user
      space = user.personal_space
      self.current_space = space.as_session_context

      block = create(:docs_block, space: owner.personal_space, collaborators: [owner.id])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      block.upsert_share_links!([domain: user.domain, state: 'enabled', policy: 'view'])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('view')

      block.upsert_share_links!([domain: user.domain, state: 'disabled', policy: 'view'])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      self.current_user = nil
      self.current_space = nil
    end

    it 'share anyone' do
      owner = create(:accounts_user)
      user = create(:accounts_user)
      space = user.personal_space
      self.current_space = Space::ANONYMOUS_CONTEXT

      block = create(:docs_block, space: owner.personal_space, collaborators: [owner.id])
      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data).to eq({ 'blockInfo' => nil })

      block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'enabled', policy: 'edit'])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('edit')

      block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'disabled', policy: 'edit'])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      self.current_user = user
      self.current_space = space.as_session_context

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']).to be_nil

      block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'enabled', policy: 'edit'])

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['permission']['policy']).to eq('edit')

      self.current_user = nil
      self.current_space = nil
    end

    it 'alias' do
      user = create(:accounts_user)
      space = user.personal_space
      self.current_user = user
      self.current_space = space.as_session_context
      block = create(:docs_block, space: space)

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['enabledAlias']).to be_nil

      a = block.aliases.create!(alias: 'foo_bar', payload: { 'key' => 'baz' })
      internal_graphql_execute(query, { id: 'foo_bar', domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['enabledAlias']).to eq({ 'key' => 'foo_bar', 'payload' => { 'key' => 'baz' } })

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['enabledAlias']).to eq({ 'key' => 'foo_bar', 'payload' => { 'key' => 'baz' } })

      a.disabled!

      internal_graphql_execute(query, { id: block.id, domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data['blockInfo']['id']).to eq(block.id)
      expect(response.data['blockInfo']['enabledAlias']).to be_nil

      internal_graphql_execute(query, { id: 'foo_bar', domain: block.space.domain })
      expect(response.success?).to be true
      expect(response.data).to eq('blockInfo' => nil)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
