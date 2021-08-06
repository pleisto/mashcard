# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::BlockPolicy, type: :policy do
  let(:user) { create(:accounts_user) }
  let(:pod) { create(:pod) }

  it 'show?' do
    block1 = create(:docs_block, pod: pod)
    block2 = create(:docs_block, pod: pod, collaborators: [user.id])

    expect(described_class.new(block1, user: user).apply(:show?)).to be false
    expect(described_class.new(block2, user: user).apply(:show?)).to be true
  end
end
