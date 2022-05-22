# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe Docs::Queries::PageBlocks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPageBlocks($domain: String!) {
        pageBlocks(domain: $domain) {
          id
          sort
          rootId
          parentId
          nextSort
          firstChildSort
          type
          data
          text
          content
          meta {
            cover {
              ... on BlockImage {
                type
                key
                source
              }
              ... on BlockColor {
                type
                color
              }
            }
            icon {
              ... on BlockImage {
                type
                key
                source
              }

              ... on BlockEmoji {
                type
                name
                emoji
              }
            }
          }
        }
      }
    GRAPHQL

    it 'work' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.data['pageBlocks']).to eq([])

      _root = create(:docs_block, space: space, collaborators: [user.id])

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.data['pageBlocks'].count).to eq(1)

      self.current_user = nil
      self.current_space = nil
    end

    it 'delete dangling' do
      user = create(:accounts_user)
      self.current_user = user
      space = create(:space)
      self.current_space = space.as_session_context

      root = create(:docs_block, space: space, collaborators: [user.id])
      child = root.create_sub_block!('abc')
      sub_child = child.create_sub_block!('abc')
      _sub_sub_child = sub_child.create_sub_block!('abc')

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].count).to eq(4)

      root.soft_delete!

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].count).to eq(0)

      root.restore!
      child.soft_delete!

      internal_graphql_execute(query, { domain: space.domain })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].count).to eq(1)

      self.current_user = nil
      self.current_space = nil
    end
  end
end
