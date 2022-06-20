# frozen_string_literal: true

require 'rails_helper'

describe User, type: :model do
  describe '.password_required?' do
    let(:user) { described_class.new(display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36)) }

    it "returns email and password can't be blank" do
      expect(user).not_to be_valid
      expect(user.errors.messages.keys).to include(:email, :password)
    end

    it 'valids if federated_identities exists' do
      user.omniauth_provider = :github
      user.omniauth_uid = Time.now.to_i
      expect(user).to be_valid
    end
  end

  describe '.personal_pod' do
    it 'personals pod created' do
      user = create(:accounts_user)
      expect(user.personal_pod).to be_present
    end
  end

  describe '.create' do
    it '.by email unconfirmed' do
      user = described_class.create!(email: FFaker::Internet.email, password: FFaker::Internet.password, display_name: FFaker::Name.name,
        username: Time.now.to_i.to_s(36))
      expect(user).to be_persisted
      expect(user.authentication).to be_persisted
      expect(user.federated_identities.length).to eq(0)

      user.update!(display_name: 'foo')
    end

    it '.by email confirmed' do
      user = described_class.create!(email: FFaker::Internet.email, password: FFaker::Internet.password, display_name: FFaker::Name.name,
        username: Time.now.to_i.to_s(36), confirmed_at: Time.current)
      expect(user).to be_persisted
      expect(user.authentication).to be_persisted
      expect(user.authentication.confirmed_at).to be_present
    end

    it '.by omniauth' do
      user = described_class.create!(display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36), omniauth_provider: :github,
        omniauth_uid: Time.now.to_i)
      expect(user).to be_persisted
      expect(user.authentication).to be_persisted
      expect(user.authentication.email).to be_nil
      expect(user.federated_identities.length).to eq(1)

      user.update!(display_name: 'foo')
    end
  end
end
