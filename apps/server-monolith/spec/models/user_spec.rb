# frozen_string_literal: true

require 'rails_helper'

describe User, type: :model do
  describe '.personal_pod' do
    it 'personals pod created' do
      user = create(:accounts_user)
      expect(user.personal_pod).to be_present
    end
  end
end
