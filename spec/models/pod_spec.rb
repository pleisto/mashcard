# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Pod, type: :model do
  context 'personal pod' do
    it 'should personal pod uniqueness' do
      user = create(:accounts_user)
      webid = Time.now.to_i.to_s(36)
      pod = Pod.new(owner: user, webid: webid, name: webid, personal: true)
      expect(pod.valid?).to be_falsey
      expect(pod.errors.messages[:owner_id][0]).to eq(I18n.t('errors.messages.taken'))
      pod.personal = false
      expect(pod.valid?).to be_truthy
    end
  end
end
