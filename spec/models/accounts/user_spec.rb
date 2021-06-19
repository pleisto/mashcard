# frozen_string_literal: true
require 'rails_helper'

describe Accounts::User, type: :model do
  context '.password_required?' do
    let(:user) { Accounts::User.new(name: FFaker::Name.name, webid: Time.now.to_i.to_s(36)) }
    it "should return email and password can't be blank" do
      expect(user).to_not be_valid
      expect(user.errors.messages.keys).to include(:email, :password)
    end

    it 'should valid if federated_identities exists' do
      user.omniauth_provider = :github
      user.omniauth_uid = Time.now.to_i
      expect(user).to be_valid
    end
  end

  context '.personal_pod' do
    it 'should personal pod created' do
      expect(Pod.find_by(personal: true, owner_id: create(:accounts_user).id)).to be_present
    end
  end
end
