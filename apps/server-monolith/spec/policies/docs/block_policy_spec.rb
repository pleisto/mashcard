# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::BlockPolicy, type: :policy do
  let(:user) { create(:accounts_user) }
  let(:collaborator_user) { create(:accounts_user) }
  let(:space) { create(:space) }
  let(:block) { create(:docs_block, space: space, collaborators: [collaborator_user.id]) }

  it 'owner' do
    expect(described_class.new(block, user: user).apply(:show?)).to be false
    expect(described_class.new(block, user: space.owner).apply(:show?)).to be true

    expect(block.show_policy?(user)).to be false
    expect(block.show_policy?(space.owner)).to be true
  end

  it 'collaborators' do
    expect(described_class.new(block, user: collaborator_user).apply(:show?)).to be true
    expect(block.show_policy?(collaborator_user)).to be true
  end

  it 'owner 2' do
    new_space = user.own_spaces.create!(domain: 'PolicyOwner', name: 'PolicyOwner')
    block2 = create(:docs_block, space: new_space)
    expect(described_class.new(block2, user: user).apply(:show?)).to be true
    expect(block2.show_policy?(user)).to be true
  end

  it 'ActionPolicy::AuthorizationContextMissing' do
    expect do
      described_class.new(block, user: nil).apply(:show?)
    end.to raise_error(ActionPolicy::AuthorizationContextMissing)
  end

  it 'anonymous' do
    new_block = create(:docs_block)
    expect(new_block.show_policy?(nil)).to be false

    new_block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'enabled', policy: 'view'])
    new_block.enabled_share_links.reload

    expect(new_block.show_policy?(nil)).to be true

    new_block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'disabled', policy: 'view'])
    new_block.enabled_share_links.reload

    expect(new_block.show_policy?(nil)).to be false
  end

  it 'anyone' do
    new_user = create(:accounts_user)
    new_block = create(:docs_block)
    expect(new_block.show_policy?(new_user)).to be false

    new_block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'enabled', policy: 'view'])
    new_block.enabled_share_links.reload

    expect(new_block.show_policy?(new_user)).to be true

    new_block.upsert_share_links!([domain: Space::ANYONE_DOMAIN, state: 'disabled', policy: 'view'])
    new_block.enabled_share_links.reload

    expect(new_block.show_policy?(new_user)).to be false
  end

  it 'share link' do
    new_user = create(:accounts_user)
    new_block = create(:docs_block)
    expect(new_block.show_policy?(new_user)).to be false

    new_block.upsert_share_links!([domain: new_user.domain, state: 'enabled', policy: 'view'])
    new_block.enabled_share_links.reload

    expect(new_block.show_policy?(new_user)).to be true

    new_block.upsert_share_links!([domain: new_user.domain, state: 'disabled', policy: 'view'])
    new_block.enabled_share_links.reload

    expect(new_block.show_policy?(new_user)).to be false
  end
end
