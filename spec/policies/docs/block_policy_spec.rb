# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::BlockPolicy, type: :policy do
  let(:user) { create(:accounts_user) }
  let(:pod) { create(:pod) }
  let(:user2) { create(:accounts_user) }
  let(:user3) { create(:accounts_user) }

  it 'show?' do
    block1 = create(:docs_block, pod: pod)
    block2 = create(:docs_block, pod: pod, collaborators: [user.id])

    expect(described_class.new(block1, user: user).apply(:show?)).to be false
    expect(described_class.new(block2, user: user).apply(:show?)).to be true
    owner = pod.owner
    owner.pod_id = pod.id
    expect(described_class.new(block2, user: owner).apply(:show?)).to be true

    expect(described_class.new(block2, user: user2).apply(:show?)).to be false
    expect(described_class.new(block2, user: user3).apply(:show?)).to be false

    share_link1 = Docs::ShareLink.create!(
      block_id: block2.id,
      target_pod_ids: [user2.personal_pod.id],
      policy: "SHOW",
      pod_id: pod.id,
      user_id: pod.owner_id
    )

    block2.reload
    expect(described_class.new(block2, user: user2).apply(:show?)).to be true
    expect(described_class.new(block2, user: user3).apply(:show?)).to be false

    share_link1.disabled!
    block2.reload

    expect(described_class.new(block2, user: user2).apply(:show?)).to be false
    expect(described_class.new(block2, user: user3).apply(:show?)).to be false

    _share_link2 = Docs::ShareLink.create!(
      block_id: block2.id,
      target_pod_ids: [],
      policy: "SHOW",
      pod_id: pod.id,
      user_id: pod.owner_id
    )
    block2.reload

    expect(described_class.new(block2, user: user2).apply(:show?)).to be true
    expect(described_class.new(block2, user: user3).apply(:show?)).to be true
  end
end
