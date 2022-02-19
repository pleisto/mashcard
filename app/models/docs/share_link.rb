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
#  share_space_id    :bigint
#  space_id          :bigint           not null
#
# Indexes
#
#  index_docs_share_links_on_key             (key) UNIQUE
#  index_docs_share_links_on_share_space_id  (share_space_id)
#

class Docs::ShareLink < ApplicationRecord
  belongs_to :space, optional: true
  belongs_to :block, optional: true
  belongs_to :share_space, optional: true, class_name: "Space"

  enum state: {
    enabled: 0,
    disabled: 10
  }

  enum policy: {
    view: 0,
    edit: 10
  }

  def anyone?
    share_space_id.nil?
  end

  before_create do
    self.space_id ||= block.space_id
    self.key = SecureRandom.uuid
  end

  def underway?
    return false if disabled?

    true
  end

  def share_domain
    return Space::ANYONE_DOMAIN if share_space_id.nil?

    share_space.domain
  end

  def share_space_data
    return share_space if share_space_id

    OpenStruct.new(id: 0, domain: Space::ANYONE_DOMAIN, name: Space::ANYONE_DOMAIN, avatar_data: nil, bio: nil, email: nil)
  end
end
