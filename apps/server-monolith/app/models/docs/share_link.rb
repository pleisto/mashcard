# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_share_links
#
#  id                :bigint           not null, primary key
#  key(Unique key)   :string           not null
#  policy            :integer          not null
#  state(Status)     :bigint           default("enabled"), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  block_id(Page id) :uuid             not null
#  pod_id            :bigint           not null
#  share_pod_id      :bigint
#
# Indexes
#
#  index_docs_share_links_on_key           (key) UNIQUE
#  index_docs_share_links_on_share_pod_id  (share_pod_id)
#

module Docs
  class ShareLink < ApplicationRecord
    belongs_to :pod, optional: true
    belongs_to :block, optional: true
    belongs_to :share_pod, optional: true, class_name: 'Pod'

    enum state: {
      enabled: 0,
      disabled: 10,
    }

    enum policy: {
      view: 0,
      edit: 10,
    }

    def anyone?
      share_pod_id.nil?
    end

    before_create do
      self.pod_id ||= block.pod_id
      self.key = Mashcard::Utils::Encoding::UUID.gen_v4
    end

    def underway?
      return false if disabled?

      true
    end

    def share_domain
      return Pod::ANYONE_DOMAIN if share_pod_id.nil?

      share_pod.domain
    end

    def share_pod_data
      return share_pod if share_pod_id

      OpenStruct.new(id: 0, domain: Pod::ANYONE_DOMAIN, name: Pod::ANYONE_DOMAIN, avatar_data: nil, bio: nil,
        email: nil)
    end
  end
end
