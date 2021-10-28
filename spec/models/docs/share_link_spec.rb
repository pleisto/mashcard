# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Docs::ShareLink, type: :model do
  let(:block) { create(:docs_block) }

  it 'anyone' do
    target = create(:docs_block)
    target.upsert_share_links!([{ webid: Pod::ANYONE_WEBID, state: "enabled", policy: "edit" }])

    expect(target.share_links.count).to eq(1)
    share_link = target.share_links.first
    expect(share_link.share_pod_id).to eq(nil)
  end

  it 'work' do
    pod = create(:pod)
    expect(block.share_links.count).to eq(0)
    block.upsert_share_links!([{ webid: pod.webid, state: "enabled", policy: "edit" }])

    expect(block.share_links.count).to eq(1)
    share_link = block.share_links.first
    expect(share_link.share_pod_id).to eq(pod.id)
    expect(share_link.pod_id).to eq(block.pod_id)
    expect(share_link.state).to eq("enabled")
    expect(share_link.enabled?).to eq(true)

    block.upsert_share_links!([{ webid: pod.webid, state: "disabled", policy: "edit" }])

    expect(block.share_links.count).to eq(1)
    share_link.reload
    expect(share_link.state).to eq("disabled")
    expect(share_link.enabled?).to eq(false)
    expect(share_link.disabled?).to eq(true)

    pod2 = create(:pod)
    block.upsert_share_links!([{ webid: pod.webid, state: "enabled", policy: "view" },
                               { webid: pod2.webid, state: "enabled", policy: "edit" }])

    expect(block.share_links.count).to eq(2)
  end

  it 'invalid policy' do
    expect do
      pod = create(:pod)
      block.upsert_share_links!([{ webid: pod.webid, state: "enabled", policy: "FOOBAR" }])
    end.to raise_error(ArgumentError)
  end

  it 'invalid webid' do
    expect do
      block.upsert_share_links!([{ webid: "foo_bar", state: "enabled", policy: "edit" }])
    end.to raise_error(ArgumentError)
  end

  it 'special webid' do
    expect do
      block.upsert_share_links!([{ webid: Pod::ANYONE_WEBID, state: "enabled", policy: "view" }])
    end.not_to raise_error
  end
end
