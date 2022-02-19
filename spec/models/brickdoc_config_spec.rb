# frozen_string_literal: true
require 'rails_helper'

RSpec.describe BrickdocConfig, type: :model do
  it 'can be read' do
    # expect(BrickdocConfig.accounts_federated_providers.first[:name]).to eq('github')
    expect(BrickdocConfig.accounts_email_password_auth?).to eq(true)
  end

  it 'can handle settings on different domains' do
    BrickdocConfig.field :domains_test, default: 'test'
    BrickdocConfig.scope(:test_scope).field :domains_test2, default: 'test'

    expect(BrickdocConfig.domains_test).to eq('test')
    expect(BrickdocConfig.scope(:test_scope).domains_test2).to eq('test')

    space1_settings = BrickdocConfig.at('space1')
    space2_settings = BrickdocConfig.at('space2')

    space2_settings.domains_test = 'test2'
    BrickdocConfig.scope(:test_scope).at('space2').domains_test2 = 'test2'

    expect(space1_settings.domains_test).to eq('test')
    expect(space1_settings.scope(:test_scope).domains_test2).to eq('test')

    expect(space2_settings.domains_test).to eq('test2')
    expect(space2_settings.scope(:test_scope).domains_test2).to eq('test2')
  end

  it 'can get and set current' do
    BrickdocConfig.field :current_key, default: 'current'
    BrickdocConfig.at('space1').current_key = 'space1'

    BrickdocConfig.on(:global) do
      expect(BrickdocConfig.current.current_key).to eq('current')
    end

    BrickdocConfig.current = BrickdocConfig.at('space1')

    expect(BrickdocConfig.current.current_key).to eq('space1')
  end
end
