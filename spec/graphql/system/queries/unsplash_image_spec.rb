# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::UnsplashImage, type: :query do
  describe '#resolver' do
    it 'works' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      query = <<-'GRAPHQL'
        query QueryUnsplashImage($query: String, $page: Int, $per_page: Int) {
          unsplashImage(query: $query, page: $page, perPage: $per_page) {
            id,
            width,
            height,
            fullUrl,
            smallUrl,
            username
          }
        }
      GRAPHQL
      internal_graphql_execute(query, query: 'cat', page: 1, per_page: 1)
      data = response.data[:unsplashImage]
      expect(response.success?).to be true
      expect(data.size).to be 1
      expect(data.first[:id]).not_to be(nil)
      expect(data.first[:width]).not_to be(nil)
      expect(data.first[:height]).not_to be(nil)
      expect(data.first[:fullUrl]).not_to be(nil)
      expect(data.first[:smallUrl]).not_to be(nil)
      expect(data.first[:username]).not_to be(nil)
    end

    it 'works with blank search' do
      user = create(:accounts_user)
      self.current_user = user
      self.current_pod = user.personal_pod.as_session_context

      query = <<-'GRAPHQL'
        query QueryUnsplashImage($query: String, $page: Int, $per_page: Int) {
          unsplashImage(query: $query, page: $page, perPage: $per_page) {
            id,
            width,
            height,
            fullUrl,
            smallUrl,
            username
          }
        }
      GRAPHQL
      internal_graphql_execute(query, query: '', page: 1, per_page: 2)
      data = response.data[:unsplashImage]
      expect(response.success?).to be true
      expect(data.size).to be 2
      expect(data.first[:id]).not_to be(nil)
      expect(data.first[:width]).not_to be(nil)
      expect(data.first[:height]).not_to be(nil)
      expect(data.first[:fullUrl]).not_to be(nil)
      expect(data.first[:smallUrl]).not_to be(nil)
      expect(data.first[:username]).not_to be(nil)
    end
  end
end
