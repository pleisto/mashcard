# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe System::Queries::Plugins, type: :query do
  describe '#resolver' do
    it 'works' do
      query = <<-'GRAPHQL'
        {
          plugins {
            name
            version
            logo
            enabled
            metadata
          }
        }
      GRAPHQL

      internal_graphql_execute(query)

      expect(response.success?).to be false

      user = create(:accounts_user)
      self.current_user = user
      self.current_space = user.personal_space.as_session_context
      internal_graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data['plugins'].present?).to be true

      self.current_user = nil
      self.current_space = nil
    end
  end
end
