# frozen_string_literal: true

require 'rails_helper'

## NOTE bundle exec rspec plugins
RSpec.describe BrickdocPlugin::GithubWebhook do
  before(:all) do
    BrickdocPlugin.load_plugins
  end

  it 'works' do
    plugin = BrickdocPlugin.all_plugins[:github_webhook]
    expect(plugin.class).to be(BrickdocPlugin)
    expect(plugin.enabled?).to be(false)
    plugin.enabled = true
    expect(plugin.enabled?).to be(true)
    expect(BrickdocPlugin.enabled?(:github_webhook)).to be(true)
    plugin.enabled = false
    expect(BrickdocPlugin.enabled?(:github_webhook)).to be(false)
  end
end
