# frozen_string_literal: true
# == Schema Information
#
# Table name: docs_share_links
#
#  id                   :bigint           not null, primary key
#  expired_at           :datetime
#  key(Unique key)      :string           not null
#  payload              :json
#  policy(Share policy) :string           not null
#  state(Status)        :bigint           default("enabled"), not null
#  target_pod_ids       :bigint           default([]), not null, is an Array
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  block_id(Page id)    :uuid             not null
#  pod_id               :bigint           not null
#  user_id              :bigint
#
# Indexes
#
#  index_docs_share_links_on_block_id_and_state_and_policy  (block_id,state,policy)
#  index_docs_share_links_on_key                            (key) UNIQUE
#  index_docs_share_links_on_target_pod_ids                 (target_pod_ids) USING gin
#
class Docs::ShareLink < ApplicationRecord
  belongs_to :pod, optional: true
  belongs_to :block, optional: true

  scope :enable, -> { where(state: :enabled) }

  enum state: {
    enabled: 0,
    disabled: 10
  }

  before_create do
    self.key = SecureRandom.uuid
  end

  def underway?
    return false if disabled?

    if expired_at
      return false if Time.current > expired_at
    end

    true
  end

  after_create do
    deliver_email_later! if target_pod_ids.present?
  end

  def deliver_email_later!
    host = Rails.application.default_url_options.fetch(:host)
    port = Rails.application.default_url_options.fetch(:port)
    pods = Pod.where(id: target_pod_ids).to_a
    path = "/#{pod.webid}/p/#{block.id}/l/#{key}"
    pods.each do |target_pod|
      InviteMailer.with(
        email: target_pod.owner.email,
        title: block.title,
        from: pod.name,
        url: "http://#{host}#{port ? ':' + port.to_s : ''}#{path}"
      ).send_link.deliver_later
    end
  end
end
