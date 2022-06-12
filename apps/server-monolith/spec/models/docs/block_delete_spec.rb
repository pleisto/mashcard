# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::Block, type: :model do
  let(:user) { create(:accounts_user) }

  it 'delete block without validate collaborators' do
    block = create(:docs_block, pod: user.personal_pod)
    block.collaborators = []
    block.soft_delete!
  end

  it '[child] soft delete and restore' do
    root = create(:docs_block, pod: user.personal_pod)
    block = create(:docs_block, pod: user.personal_pod, sort: 100, parent: root, root_id: root.id)
    create(:docs_block, pod: user.personal_pod, sort: 200, parent: root, root_id: root.id)

    child = create(:docs_block, pod: user.personal_pod, sort: 300, parent: block, root_id: root.id)

    expect(root.descendants.count).to eq(4)
    expect(root.descendants_raw.count).to eq(4)
    expect(child.ancestors.count).to eq(3)
    expect(child.ancestors_raw.count).to eq(3)

    expect(root.descendants(unscoped: true).count).to eq(4)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(3)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)

    block.soft_delete!

    expect(root.descendants(unscoped: true).count).to eq(4)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(3)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)

    expect(root.descendants.count).to eq(2)
    expect(root.descendants_raw.count).to eq(2)
    expect(child.ancestors.count).to eq(1)
    expect(child.ancestors_raw.count).to eq(1)

    block.restore!

    expect(root.descendants.count).to eq(4)
    expect(root.descendants_raw.count).to eq(4)
    expect(child.ancestors.count).to eq(3)
    expect(child.ancestors_raw.count).to eq(3)

    expect(root.descendants(unscoped: true).count).to eq(4)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(3)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)
  end

  it '[child] delete permanently' do
    root = create(:docs_block, pod: user.personal_pod)
    block = create(:docs_block, pod: user.personal_pod, sort: 100, parent: root, root_id: root.id)
    create(:docs_block, pod: user.personal_pod, sort: 200, parent: root, root_id: root.id)

    child = create(:docs_block, pod: user.personal_pod, sort: 300, parent: block, root_id: root.id)

    expect(root.descendants.count).to eq(4)
    expect(root.descendants_raw.count).to eq(4)
    expect(child.ancestors.count).to eq(3)
    expect(child.ancestors_raw.count).to eq(3)

    expect(root.descendants(unscoped: true).count).to eq(4)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(3)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)

    block.soft_delete!
    block.hard_delete!

    expect(root.descendants(unscoped: true).count).to eq(2)
    expect(root.descendants_raw(unscoped: true).count).to eq(2)
    expect(child.ancestors(unscoped: true).count).to eq(0)
    expect(child.ancestors_raw(unscoped: true).count).to eq(0)

    expect(root.descendants.count).to eq(2)
    expect(root.descendants_raw.count).to eq(2)
    expect(child.ancestors.count).to eq(0)
    expect(child.ancestors_raw.count).to eq(0)
  end

  it '[sub] soft delete and restore' do
    root = create(:docs_block, pod: user.personal_pod)
    block = create(:docs_block, pod: user.personal_pod, sort: 100, parent: root)
    create(:docs_block, pod: user.personal_pod, sort: 200, parent: root, root_id: root.id)

    child = create(:docs_block, pod: user.personal_pod, sort: 300, parent: block, root_id: block.id)

    expect(root.descendants.count).to eq(2)
    expect(root.descendants_raw.count).to eq(4)
    expect(child.ancestors.count).to eq(2)
    expect(child.ancestors_raw.count).to eq(3)

    expect(root.descendants(unscoped: true).count).to eq(2)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(2)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)

    block.soft_delete!

    expect(root.descendants(unscoped: true).count).to eq(2)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(2)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)

    expect(root.descendants.count).to eq(2)
    expect(root.descendants_raw.count).to eq(2)
    expect(child.ancestors.count).to eq(1)
    expect(child.ancestors_raw.count).to eq(1)

    block.restore!

    expect(root.descendants.count).to eq(2)
    expect(root.descendants_raw.count).to eq(4)
    expect(child.ancestors.count).to eq(2)
    expect(child.ancestors_raw.count).to eq(3)

    expect(root.descendants(unscoped: true).count).to eq(2)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(2)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)
  end

  it '[sub] delete permanently' do
    root = create(:docs_block, pod: user.personal_pod)
    block = create(:docs_block, pod: user.personal_pod, sort: 100, parent: root)
    create(:docs_block, pod: user.personal_pod, sort: 200, parent: root, root_id: root.id)

    child = create(:docs_block, pod: user.personal_pod, sort: 300, parent: block, root_id: block.id)

    expect(root.descendants.count).to eq(2)
    expect(root.descendants_raw.count).to eq(4)
    expect(child.ancestors.count).to eq(2)
    expect(child.ancestors_raw.count).to eq(3)

    expect(root.descendants(unscoped: true).count).to eq(2)
    expect(root.descendants_raw(unscoped: true).count).to eq(4)
    expect(child.ancestors(unscoped: true).count).to eq(2)
    expect(child.ancestors_raw(unscoped: true).count).to eq(3)

    block.soft_delete!
    block.hard_delete!

    expect(root.descendants(unscoped: true).count).to eq(2)
    expect(root.descendants_raw(unscoped: true).count).to eq(2)
    expect(child.ancestors(unscoped: true).count).to eq(0)
    expect(child.ancestors_raw(unscoped: true).count).to eq(0)

    expect(root.descendants.count).to eq(2)
    expect(root.descendants_raw.count).to eq(2)
    expect(child.ancestors.count).to eq(0)
    expect(child.ancestors_raw.count).to eq(0)
  end
end
