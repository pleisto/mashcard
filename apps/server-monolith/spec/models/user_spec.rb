# frozen_string_literal: true

require 'rails_helper'

describe User, type: :model do
  describe '.personal_pod' do
    it 'personals pod created' do
      user = create(:accounts_user)
      expect(user.personal_pod).to be_present
    end
  end

  describe '.destroy' do
    it 'ok' do
      user = create(:accounts_user)
      user.destroy_user!

      expect(user.reload.deleted_at).not_to be_nil
    end
  end
end
