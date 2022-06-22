# frozen_string_literal: true

require 'rails_helper'

describe Users::Authentication, type: :model do
  describe '.password_required?' do
    let(:authentication) { described_class.new(display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36)) }

    it "returns username can't be blank" do
      auth = described_class.new(email: FFaker::Internet.email, password: FFaker::Internet.password)
      expect(auth).not_to be_valid
      expect(auth.errors.messages.keys).to include(:username, :display_name)
    end

    it "returns email and password can't be blank" do
      expect(authentication).not_to be_valid
      expect(authentication.errors.messages.keys).to include(:email, :password)
    end

    it 'valids if federated_identities exists' do
      authentication.omniauth_provider = :github
      authentication.omniauth_uid = Time.now.to_i
      expect(authentication).to be_valid
    end
  end

  describe '.create' do
    it '.by email unconfirmed' do
      authentication = described_class.create!(
        email: FFaker::Internet.email, password: FFaker::Internet.password, display_name: FFaker::Name.name,
        username: Time.now.to_i.to_s(36)
      )
      expect(authentication).to be_persisted
      expect(authentication.user).to be_persisted
      expect(authentication.federated_identities.length).to eq(0)

      authentication.user.update!(display_name: 'foo')
    end

    it '.by email confirmed' do
      authentication = described_class.create!(
        email: FFaker::Internet.email, password: FFaker::Internet.password, display_name: FFaker::Name.name,
        username: Time.now.to_i.to_s(36), confirmed_at: Time.current
      )
      expect(authentication).to be_persisted
      expect(authentication.user).to be_persisted
      expect(authentication.confirmed_at).to be_present
    end

    it '.by omniauth' do
      authentication = described_class.create!(
        display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36), omniauth_provider: :github,
        omniauth_uid: Time.now.to_i
      )
      expect(authentication).to be_persisted
      expect(authentication.user).to be_persisted
      expect(authentication.email).to be_nil
      expect(authentication.federated_identities.length).to eq(1)

      authentication.user.update!(display_name: 'foo')
    end
  end
end
