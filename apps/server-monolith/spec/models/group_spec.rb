# frozen_string_literal: true

require 'rails_helper'

describe Group, type: :model do
  describe '.password_required?' do
    let(:group) { described_class.new(display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36)) }

    it "returns owner_id can't be blank" do
      expect(group).not_to be_valid
      expect(group.errors.messages.keys).to include(:owner_id)
    end
  end

  describe '.create' do
    it 'ok' do
      group = described_class.create!(display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36), owner_id: create(:owner).id)
      expect(group).to be_persisted

      group.update!(display_name: 'foo')
    end
  end

  describe '.update' do
    it 'invite enable' do
      group = described_class.create!(display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36), owner_id: create(:owner).id)

      group.update!(invite_enable: true)
      expect(group.invite_enable).to be(true)
      expect(group.invite_secret).to be(nil)

      group.update!(invite_secret: '123123')
      expect(group.invite_secret).to eq('123123')

      group.update!(invite_enable: false)
      expect(group.invite_enable).to be(false)
      expect(group.invite_secret).to eq('123123')

      group.update!(invite_secret: '')
      expect(group.invite_secret).to be(nil)

      group.update!(invite_enable: true, invite_secret: '')
      expect(group.invite_enable).to be(true)
      expect(group.invite_secret).not_to be(nil)

      group.update!(invite_enable: false, invite_secret: '')
      expect(group.invite_enable).to be(false)
      expect(group.invite_secret).to be(nil)
    end
  end

  describe '.relation' do
    it 'group member' do
      user = create(:accounts_user)
      domain = 'pod-member'
      group = user.create_own_group!(username: domain, display_name: domain)
      user2 = create(:accounts_user)

      group.members.create!(user_id: user2.id, role: :member)

      expect(user2.groups.find_by(id: group.id)).not_to be_nil
      expect(group.members.count).to eq(2)

      group.members.find_by!(user_id: user2.id).disabled!

      expect(user2.groups.find_by(id: group.id)).to be_nil
      expect(group.members.count).to eq(1)
    end

    it '.normal' do
      group = create(:group)

      members = group.members.to_a
      expect(members.length).to eq(1)
      first_member = members.first
      owner = group.owner

      expect(first_member.group).to eq(group)
      expect(first_member.user).to eq(owner)
      expect(first_member.role).to eq('owner')

      expect(group.owner_member.id).to be(first_member.id)

      child = create(:accounts_user)
      group.members.create!(user_id: child.id, role: :member)

      expect(group.members.reload.length).to eq(2)

      expect(owner.group_members.length).to eq(1)
      expect(owner.group_members.first.group.id).to eq(group.id)
      expect(owner.groups.length).to eq(1)
      expect(owner.groups.first.id).to eq(group.id)

      expect(owner.owned_group_members.reload.length).to eq(1)
      expect(owner.owned_group_members.first.id).to eq(first_member.id)

      expect(owner.owned_groups.reload.length).to eq(1)
      expect(owner.owned_groups.first.id).to be(group.id)

      expect(child.owned_group_members.length).to eq(0)
      expect(child.owned_groups.length).to eq(0)

      owner.create_own_group!(display_name: FFaker::Name.name, username: Time.now.to_i.to_s(36))
      expect(owner.owned_group_members.length).to eq(2)
      expect(owner.owned_groups.reload.length).to eq(2)
    end
  end
end
