# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Pod, type: :model do
  context 'personal pod' do
    it 'personals pod uniqueness' do
      user = create(:accounts_user)
      domain = Time.now.to_i.to_s(36)
      pod = described_class.new(owner: user, domain: domain, name: domain, personal: true)
      expect(pod).not_to be_valid
      expect(pod.errors.messages[:owner_id][0]).to eq(I18n.t('errors.messages.taken'))
      pod.personal = false
      expect(pod).to be_valid
    end

    it '(personal pod) member' do
      user = create(:accounts_user)
      pod_id = user.personal_pod.id
      expect(user.pods.find_by(id: pod_id)).not_to be_nil
      expect(user.members.find_by(pod_id: pod_id)).not_to be_nil

      expect(user.personal_pod.members.count).to eq(1)
      expect(user.personal_pod.users.count).to eq(1)
    end

    it '(create pod) member' do
      user = create(:accounts_user)
      domain = 'create-pod-member'
      pod = user.own_pods.create!(domain: domain, name: domain)

      expect(pod.members.count).to eq(1)
      expect(pod.users.count).to eq(1)
      expect(user.pods.count).to eq(2)
      expect(user.members.count).to eq(2)
    end

    it 'pod member' do
      user = create(:accounts_user)
      domain = 'pod-member'
      pod = user.own_pods.create!(domain: domain, name: domain)
      user2 = create(:accounts_user)

      pod.members.create!(user_id: user2.id, role: :admin)

      expect(user2.pods.find_by(id: pod.id)).not_to be_nil
      expect(pod.users.count).to eq(2)

      pod.members.find_by!(user_id: user2.id).disabled!

      expect(user2.pods.find_by(id: pod.id)).to be_nil
      expect(pod.users.count).to eq(1)
    end
  end
end
