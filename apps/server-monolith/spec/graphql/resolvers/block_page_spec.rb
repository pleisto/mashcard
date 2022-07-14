# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::PageBlocks, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
      query GetPageBlocks($domain: String!) {
        pageBlocks(domain: $domain) {
          id
          sort
          nextSort
          firstChildSort
          parentId
          documentInfo {
            id
            title
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
            pin
          }
        }
      }
    GRAPHQL

    it 'work' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)
      self.current_pod = pod.as_session_context

      graphql_execute(query, { domain: pod.domain })
      expect(response.data['pageBlocks']).to eq([])

      _root = create(:docs_block, pod: pod, collaborators: [user.id])

      graphql_execute(query, { domain: pod.domain })
      expect(response.data['pageBlocks'].count).to eq(1)

      self.current_user = nil
      self.current_pod = nil
    end

    it 'delete dangling' do
      user = create(:accounts_user)
      self.current_user = user
      pod = create(:pod)
      self.current_pod = pod.as_session_context

      root = create(:docs_block, pod: pod, collaborators: [user.id])
      child = root.create_sub_block!('abc')
      sub_child = child.create_sub_block!('abc')
      _sub_sub_child = sub_child.create_sub_block!('abc')

      graphql_execute(query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].count).to eq(4)

      root.soft_delete!

      graphql_execute(query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].count).to eq(0)

      root.restore!
      child.soft_delete!

      graphql_execute(query, { domain: pod.domain })
      expect(response.success?).to be true
      expect(response.data['pageBlocks'].count).to eq(1)

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
