# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::ShareLink, type: :model do
  let(:block) { create(:docs_block) }

  it 'anyone' do
    target = create(:docs_block)
    target.upsert_share_links!([{ domain: Pod::ANYONE_DOMAIN, state: 'enabled', policy: 'edit' }])

    expect(target.share_links.count).to eq(1)
    share_link = target.share_links.first
    expect(share_link.share_pod_id).to be_nil
  end

  it 'work' do
    pod = create(:pod)
    expect(block.share_links.count).to eq(0)
    block.upsert_share_links!([{ domain: pod.domain, state: 'enabled', policy: 'edit' }])

    expect(block.share_links.count).to eq(1)
    share_link = block.share_links.first
    expect(share_link.share_pod_id).to eq(pod.id)
    expect(share_link.pod_id).to eq(block.pod_id)
    expect(share_link.state).to eq('enabled')
    expect(share_link.enabled?).to be(true)

    block.upsert_share_links!([{ domain: pod.domain, state: 'disabled', policy: 'edit' }])

    expect(block.share_links.count).to eq(1)
    share_link.reload
    expect(share_link.state).to eq('disabled')
    expect(share_link.enabled?).to be(false)
    expect(share_link.disabled?).to be(true)

    pod2 = create(:pod)
    block.upsert_share_links!([{ domain: pod.domain, state: 'enabled', policy: 'view' },
                               { domain: pod2.domain, state: 'enabled', policy: 'edit' },])

    expect(block.share_links.count).to eq(2)
  end

  it 'invalid policy' do
    expect do
      pod = create(:pod)
      block.upsert_share_links!([{ domain: pod.domain, state: 'enabled', policy: 'FOOBAR' }])
    end.to raise_error(ArgumentError)
  end

  it 'invalid domain' do
    expect do
      block.upsert_share_links!([{ domain: 'foo_bar', state: 'enabled', policy: 'edit' }])
    end.to raise_error(ArgumentError)
  end

  it 'special domain' do
    expect do
      block.upsert_share_links!([{ domain: Pod::ANYONE_DOMAIN, state: 'enabled', policy: 'view' }])
    end.not_to raise_error
  end
end
