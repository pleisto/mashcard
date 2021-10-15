# frozen_string_literal: true
# == Schema Information
#
# Table name: docs_share_links
#
#  id                :bigint           not null, primary key
#  key(Unique key)   :string           not null
#  policy            :integer          not null
#  share_webid       :string           not null
#  state(Status)     :bigint           default("enabled"), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  block_id(Page id) :uuid             not null
#  pod_id            :bigint           not null
#
# Indexes
#
#  index_docs_share_links_on_key          (key) UNIQUE
#  index_docs_share_links_on_share_webid  (share_webid)
#
class Docs::ShareLink < ApplicationRecord
  belongs_to :pod, optional: true
  belongs_to :block, optional: true
  belongs_to :share_pod, optional: true, foreign_key: :share_webid, primary_key: :webid, class_name: "Pod"

  scope :enable, -> { where(state: :enabled) }

  enum state: {
    enabled: 0,
    disabled: 10
  }

  enum policy: {
    view: 0,
    edit: 10
  }

  def anyone?
    share_webid == Pod::ANYONE_WEBID
  end

  validates_with Brickdoc::Validators::WebidPresenceValidator, field: :share_webid, unless: :anyone?

  before_create do
    self.pod_id ||= block.pod_id
    self.key = SecureRandom.uuid
  end

  def underway?
    return false if disabled?

    true
  end

  def share_pod_data
    target = share_pod
    return target if target

    OpenStruct.new(id: 0, webid: share_webid, name: share_webid, avatar_data: nil, bio: nil, email: nil)
  end

  after_create do
    # deliver_email_later! unless anyone?
  end

  def deliver_email_later!
    target_pod = share_pod
    return if target_pod.nil?

    deliver_later_by_email!(target_pod.owner.email)
  end

  def deliver_later_by_email!(email)
    host = Brickdoc::Runtime.host
    url = "#{host}/#{pod.webid}/p/#{block.id}/l/#{key}"

    InviteMailer.with(
      email: email,
      title: block.title,
      from: pod.name,
      url: url
    ).send_link.deliver_later
  end
end
