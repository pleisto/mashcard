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
  include GroupInviteable

  validates :username, presence: true, username: true, uniqueness: { case_sensitive: false, conditions: -> {
                                                                                                          with_deleted
                                                                                                        }, }
  validates :display_name, presence: true
  has_many :blocks, class_name: 'Docs::Block', dependent: :destroy
  has_many :share_links, dependent: :restrict_with_exception, class_name: 'Docs::ShareLink'

  ANYONE_DOMAIN = 'anyone'
  ANONYMOUS_DOMAIN = 'anonymous'

  # delegate :email, to: :owner

  has_one_attached :avatar

  # TODO: remove this
  alias_attribute :name, :display_name
  alias_attribute :domain, :username

  def avatar_data
    return nil if avatar.blob.nil?

    {
      url: avatar.blob.real_url,
      download_url: avatar.blob.real_url(disposition: 'attachment'),
      signed_id: avatar.blob.signed_id,
    }
  end

  def pod_as_json_by_user(user)
    owned = owner.id === user.id
    personal = id === user.id
    {
      id: id,
      avatar_data: avatar_data,
      bio: bio,
      domain: username,
      name: display_name,
      owned: owned,
      personal: personal,
      invite_enable: owned ? invite_enable : nil,
      invite_secret: owned ? invite_secret : nil,
    }
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

  def ensure_owner_member!
    members.find_or_create_by!(user_id: owner_id) do |member|
      member.role = :admin
    end
  end

  def as_session_context
    { 'id' => id, 'username' => username, 'domain' => username }
  end

  def destroy_pod!
    ActiveRecord::Base.transaction do
      share_links.destroy_all
      # all validatrs and callbacks are skipped
      update_columns(
        name: "delete user #{hashed_id}",
        domain: "deleted_user_#{hashed_id}",
        bio: "masked domain #{domain.to_data_masking} has ben deleted",
        invite_enable: false
      )
      destroy!
      true
    end
  end
end
