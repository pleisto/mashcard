# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Space, type: :model do
  context 'personal space' do
    it 'personals space uniqueness' do
      user = create(:accounts_user)
      domain = Time.now.to_i.to_s(36)
      space = described_class.new(owner: user, domain: domain, name: domain, personal: true)
      expect(space).not_to be_valid
      expect(space.errors.messages[:owner_id][0]).to eq(I18n.t('errors.messages.taken'))
      space.personal = false
      expect(space).to be_valid
    end

    it '(personal space) member' do
      user = create(:accounts_user)
      space_id = user.personal_space.id
      expect(user.spaces.find_by(id: space_id)).not_to be_nil
      expect(user.members.find_by(space_id: space_id)).not_to be_nil

      expect(user.personal_space.members.count).to eq(1)
      expect(user.personal_space.users.count).to eq(1)
    end

    it '(create space) member' do
      user = create(:accounts_user)
      domain = 'create-space-member'
      space = user.own_spaces.create!(domain: domain, name: domain)

      expect(space.members.count).to eq(1)
      expect(space.users.count).to eq(1)
      expect(user.spaces.count).to eq(2)
      expect(user.members.count).to eq(2)
    end

    it 'space member' do
      user = create(:accounts_user)
      domain = 'space-member'
      space = user.own_spaces.create!(domain: domain, name: domain)
      user2 = create(:accounts_user)

      space.members.create!(user_id: user2.id, role: :admin)

      expect(user2.spaces.find_by(id: space.id)).not_to be_nil
      expect(space.users.count).to eq(2)

      space.members.find_by!(user_id: user2.id).disabled!

      expect(user2.spaces.find_by(id: space.id)).to be_nil
      expect(space.users.count).to eq(1)
    end
  end
end
