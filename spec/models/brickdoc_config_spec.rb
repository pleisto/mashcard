# frozen_string_literal: true
require 'rails_helper'

RSpec.describe BrickdocConfig, type: :model do
  it 'can be read' do
    # expect(BrickdocConfig.accounts_federated_providers.first[:name]).to eq('github')
    expect(BrickdocConfig.accounts_email_password_auth?).to eq(true)
  end

  it 'can expose settings fields to frontend context' do
    BrickdocConfig.field :test_fe_field, default: 'test', frontend: true
    BrickdocConfig.scope(:fe_scope).field :test_fe_field2, default: 'test', frontend: true

    expect(BrickdocConfig.frontend_fields['']).to include('test_fe_field')
    expect(BrickdocConfig.frontend_fields['fe_scope']).to include('test_fe_field2')

    frontend_context = BrickdocConfig.to_frontend

    expect(frontend_context['']['test_fe_field']).to eq('test')
    expect(frontend_context['fe_scope']['test_fe_field2']).to eq('test')
  end

  it 'can handle settings on different domains' do
    BrickdocConfig.field :domains_test, default: 'test'
    BrickdocConfig.scope(:test_scope).field :domains_test2, default: 'test'

    expect(BrickdocConfig.domains_test).to eq('test')
    expect(BrickdocConfig.scope(:test_scope).domains_test2).to eq('test')

    pod1_settings = BrickdocConfig.at('pod1')
    pod2_settings = BrickdocConfig.at('pod2')

    pod2_settings.domains_test = 'test2'
    BrickdocConfig.scope(:test_scope).at('pod2').domains_test2 = 'test2'

    expect(pod1_settings.domains_test).to eq('test')
    expect(pod1_settings.scope(:test_scope).domains_test2).to eq('test')

    expect(pod2_settings.domains_test).to eq('test2')
    expect(pod2_settings.scope(:test_scope).domains_test2).to eq('test2')
  end

  it 'can get and set current' do
    BrickdocConfig.field :current_key, default: 'current'
    BrickdocConfig.at('pod1').current_key = 'pod1'

    BrickdocConfig.current = BrickdocConfig

    expect(BrickdocConfig.current.current_key).to eq('current')

    BrickdocConfig.current = BrickdocConfig.at('pod1')

    expect(BrickdocConfig.current.current_key).to eq('pod1')
  end
end
