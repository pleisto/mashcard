# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::Block, type: :model do
  context '.create block' do
    let(:user) { create(:accounts_user) }
    let(:pod) { create(:pod, owner: user) }
    let(:block) { create(:docs_block, pod: pod) }

    it 'basic' do
      expect(block.pod_id).to eq(pod.id)
    end
  end
end
