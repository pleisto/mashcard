# frozen_string_literal: true

# == Schema Information
#
# Table name: pods
#
#  id                                                                         :bigint           not null, primary key
#  bio("Bio" means Biography in social media.)                                :string(140)
#  deleted_at                                                                 :datetime
#  display_name                                                               :string           not null
#  external_avatar_url                                                        :string
#  last_block_ids                                                             :json             not null
#  last_pod_username                                                          :string
#  suspended_at(the date when the user was suspended)                         :datetime
#  suspended_reason(enumeration value for the reason for the user suspension) :integer          default(0)
#  type                                                                       :enum             not null
#  username                                                                   :string           not null
#  created_at                                                                 :datetime         not null
#  updated_at                                                                 :datetime         not null
#
# Indexes
#
#  index_pods_on_deleted_at           (deleted_at)
#  index_pods_on_lower_username_text  (lower((username)::text)) UNIQUE
#  index_pods_on_type                 (type)
#
class Pod < ApplicationRecord
  acts_as_paranoid

  include Hashedidable

  validates :username, presence: true, username: true, uniqueness: { case_sensitive: false, conditions: -> {
                                                                                                          with_deleted
                                                                                                        }, }
  validates :display_name, presence: true
  has_many :blocks, class_name: 'Docs::Block', dependent: :destroy

  ANYONE_DOMAIN = 'anyone'
  ANONYMOUS_DOMAIN = 'anonymous'

  has_one_attached :avatar

  # TODO: remove this
  alias_attribute :name, :display_name
  alias_attribute :domain, :username

  # Usage: current_user.pods([:avatar_attachment])
  def avatar_data
    return nil if avatar.blob.nil?

    {
      url: avatar.blob.real_url,
      download_url: avatar.blob.real_url(disposition: 'attachment'),
      signed_id: avatar.blob.signed_id,
    }
  end

  # Check if current pod is current user's personal pod
  def personal
    id === Current.user&.id
  end

  # Check if current pod is current user's owned pod
  def owned
    owner.id === Current.user&.id
  end

  # Update the username of the pod
  def update_username(new_username)
    return true if new_username == username

    old_username = username
    self.username = new_username
    self.save

    return false if self.errors.present?

    Pod.where(last_pod_username: old_username).update_all(last_pod_username: new_username) if old_username.present?

    true
  end

  def self.domain_available?(username)
    instance = new
    instance.username = username

    return { success: true, message: 'ok' } if instance.valid?

    errors = instance.errors[:username]

    if errors.blank?
      { success: true, message: 'ok' }
    else
      { success: false, message: errors.first }
    end
  end

  ANONYMOUS_CONTEXT = {
    'username' => ANONYMOUS_DOMAIN,
    'id' => nil,
  }

  def as_session_context
    { 'id' => id, 'username' => username, 'domain' => username }
  end
end
