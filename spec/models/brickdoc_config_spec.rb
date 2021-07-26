# frozen_string_literal: true
require 'rails_helper'

RSpec.describe BrickdocConfig, type: :model do
  it 'can be read' do
    # expect(BrickdocConfig.accounts_federated_providers.first[:name]).to eq('github')
    expect(BrickdocConfig.accounts_email_password_auth?).to eq(true)
  end
end
