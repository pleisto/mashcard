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
      self.current_pod = user.personal_pod.as_session_context
      internal_graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data['plugins'].present?).to be false

      github_webhook_plugin = BrickdocPlugin.plugin(:github_webhook)
      github_webhook_plugin.enabled = true

      internal_graphql_execute(query)

      expect(response.success?).to be true
      expect(response.data['plugins'].present?).to be true

      self.current_user = nil
      self.current_pod = nil
    end
  end
end
