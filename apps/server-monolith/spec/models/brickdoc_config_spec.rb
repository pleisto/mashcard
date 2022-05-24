# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BrickdocConfig, type: :model do
  it 'can be read' do
    # expect(BrickdocConfig.accounts_federated_providers.first[:name]).to eq('github')
    expect(described_class.accounts_email_password_auth?).to be(true)
  end

  it 'can handle settings on different domains' do
    described_class.field :domains_test, default: 'test'
    described_class.scope(:test_scope).field :domains_test2, default: 'test'

    expect(described_class.domains_test).to eq('test')
    expect(described_class.scope(:test_scope).domains_test2).to eq('test')

    space1_settings = described_class.at('space1')
    space2_settings = described_class.at('space2')

    space2_settings.domains_test = 'test2'
    described_class.scope(:test_scope).at('space2').domains_test2 = 'test2'

    expect(space1_settings.domains_test).to eq('test')
    expect(space1_settings.scope(:test_scope).domains_test2).to eq('test')

    expect(space2_settings.domains_test).to eq('test2')
    expect(space2_settings.scope(:test_scope).domains_test2).to eq('test2')
  end

  it 'can get and set current' do
    described_class.field :current_key, default: 'current'
    described_class.at('space1').current_key = 'space1'

    described_class.on(:global) do
      expect(described_class.current.current_key).to eq('current')
    end

    described_class.current = described_class.at('space1')

    expect(described_class.current.current_key).to eq('space1')
  end
end
