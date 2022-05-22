# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::Block, type: :model do
  it 'single block' do
    block = create(:docs_block, text: 'foo')
    block.save_snapshot!
    block.update!(text: 'bar')
    snapshot = block.snapshots.last
    snapshot.restore!
    block.reload

    expect(block.text).to eq('foo')
  end

  it 'complex block' do
    old_text = 'foo'
    new_text = 'bar'
    block = create(:docs_block, text: old_text)
    child_block1 = create(:docs_block, text: old_text, space: block.space, parent: block, root_id: block.id)
    child_block2 = create(:docs_block, text: old_text, space: block.space, parent: block, root_id: block.id)
    _sub_block1 = create(:docs_block, text: old_text, space: block.space, parent: block, id: SecureRandom.uuid)
    sub_block2 = create(:docs_block, text: old_text, space: block.space, parent: block, id: SecureRandom.uuid)

    expect(block.descendants.ids.sort).to eq([block.id, child_block1.id, child_block2.id].sort)

    expect(child_block1.histories.count).to eq(1)

    ## Snapshot 1
    block.save_snapshot!

    child_block1.soft_delete!
    child_block3 = create(:docs_block, text: old_text, space: block.space, parent: block, root_id: block.id)

    expect(child_block1.histories.count).to eq(2)

    expect(block.descendants.ids.sort).to eq([block.id, child_block2.id, child_block3.id].sort)
    expect(block.descendants(unscoped: true).ids.sort).to eq([block.id, child_block1.id, child_block2.id,
                                                              child_block3.id,].sort)

    snapshot1 = block.snapshots.find_by!(snapshot_version: 1)
    expect(snapshot1.version_meta.keys.sort).to eq([block.id, child_block1.id, child_block2.id].sort)

    ## Snapshot 2
    block.save_snapshot!

    snapshot2 = block.snapshots.find_by!(snapshot_version: 2)
    expect(snapshot2.version_meta.keys).to eq([block.id, child_block2.id, child_block3.id].sort)

    expect(block.snapshots.count).to eq(2)
    block.reload
    expect(block.snapshot_version).to eq(2)

    expect(child_block1.deleted_at).not_to be_nil

    snapshot1.restore!

    child_block1.reload
    expect(child_block1.deleted_at).to be_nil
    expect(child_block1.histories.count).to eq(3)

    expect(block.descendants.ids.sort).to eq([block.id, child_block1.id, child_block2.id].sort)
    expect(block.descendants(unscoped: true).ids.sort).to eq([block.id, child_block1.id, child_block2.id,
                                                              child_block3.id,].sort)

    expect(block.snapshots.count).to eq(3)
    block.reload
    expect(block.snapshot_version).to eq(3)

    sub_block2.update!(text: new_text)
    child_block4 = create(:docs_block, text: old_text, space: block.space, parent: block, root_id: block.id)
    child_block1.update!(text: new_text)
    child_block2.soft_delete!

    expect(child_block1.histories.count).to eq(4)

    ## Snapshot 4
    block.save_snapshot!

    snapshot3 = block.snapshots.find_by!(snapshot_version: 3)
    expect(snapshot3.version_meta.keys).to eq([block.id, child_block2.id, child_block3.id].sort)

    snapshot1.restore!
    sub_block2.reload
    child_block3.reload
    child_block2.reload
    child_block1.reload
    child_block4.reload

    expect(sub_block2.text).to eq(new_text)
    expect(child_block1.text).to eq(old_text)
    expect(child_block2.deleted_at).to be_nil
    expect(child_block4.deleted_at).not_to be_nil
    expect(block.descendants.ids.sort).to eq([block.id, child_block1.id, child_block2.id].sort)

    expect(child_block1.histories.count).to eq(5)
  end
end
