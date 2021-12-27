# frozen_string_literal: true
# == Schema Information
#
# Table name: docs_share_links
#
#  id           :integer          not null, primary key
#  block_id     :uuid             not null
#  pod_id       :integer          not null
#  key          :string           not null
#  state        :integer          default("0"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  policy       :integer          not null
#  share_pod_id :integer
#
# Indexes
#
#  index_docs_share_links_on_key           (key) UNIQUE
#  index_docs_share_links_on_share_pod_id  (share_pod_id)
#

class Docs::ShareLink < ApplicationRecord
  belongs_to :pod, optional: true
  belongs_to :block, optional: true
  belongs_to :share_pod, optional: true, class_name: "Pod"

  enum state: {
    enabled: 0,
    disabled: 10
  }

  enum policy: {
    view: 0,
    edit: 10
  }

  def anyone?
    share_pod_id.nil?
  end

  before_create do
    self.pod_id ||= block.pod_id
    self.key = SecureRandom.uuid
  end

  def underway?
    return false if disabled?

    true
  end

  def share_webid
    return Pod::ANYONE_WEBID if share_pod_id.nil?

    share_pod.webid
  end

  def share_pod_data
    return share_pod if share_pod_id

    OpenStruct.new(id: 0, webid: Pod::ANYONE_WEBID, name: Pod::ANYONE_WEBID, avatar_data: nil, bio: nil, email: nil)
  end
end
