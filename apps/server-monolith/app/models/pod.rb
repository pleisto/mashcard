# frozen_string_literal: true

# == Schema Information
#
# Table name: pods
#
#  id                                          :bigint           not null, primary key
#  bio("Bio" means Biography in social media.) :string(140)
#  deleted_at                                  :datetime
#  domain                                      :string           not null
#  invite_enable                               :boolean          default(FALSE), not null
#  invite_secret                               :string
#  name                                        :string           not null
#  personal                                    :boolean          default(FALSE), not null
#  created_at                                  :datetime         not null
#  updated_at                                  :datetime         not null
#  owner_id                                    :bigint           not null
#
# Indexes
#
#  index_pods_on_deleted_at         (deleted_at)
#  index_pods_on_invite_secret      (invite_secret) UNIQUE
#  index_pods_on_lower_domain_text  (lower((domain)::text)) UNIQUE
#  index_pods_on_owner_id           (owner_id)
#
class Pod < ApplicationRecord
  acts_as_paranoid
  belongs_to :owner, class_name: 'Accounts::User'
  validates :domain, presence: true, domain: true, uniqueness: { case_sensitive: false, conditions: -> {
                                                                                                      with_deleted
                                                                                                    }, }
  validates :name, presence: true
  validates :name, presence: true
  validates :owner_id, uniqueness: { scope: :personal, if: proc { personal? } }
  has_many :blocks, class_name: 'Docs::Block', dependent: :destroy
  has_many :share_links, dependent: :restrict_with_exception, class_name: 'Docs::ShareLink'
  has_many :members, -> { enabled }, class_name: 'Accounts::Member', dependent: :destroy, inverse_of: :pod
  has_many :all_members, class_name: 'Accounts::Member', dependent: :destroy
  has_many :users, class_name: 'Accounts::User', through: :members

  before_save :set_invite_secret
  after_create :ensure_owner_member!

  ANYONE_DOMAIN = 'anyone'
  ANONYMOUS_DOMAIN = 'anonymous'

  delegate :email, to: :owner
  default_value_for :personal, false

  has_one_attached :avatar

  def self.import_avatar(_url)
    nil
    # io = URI.open(url)
    # filename = File.basename(URI.parse(url).path)
    # key = "global/#{ActiveStorage::Blob.generate_unique_secure_token}_#{filename}"
    # blob = ActiveStorage::Blob.create_and_upload!(key: key, io: io, service_name: service_name, filename: filename)
    # blob.signed_id
  end

  def pod_attributes
    attributes.merge('avatar_data' => avatar_data)
  end

  ## NOTE persist pod_id and user_id
  def fix_avatar!
    blob = avatar.blob
    return if blob.nil?
    return if blob.pod_id && blob.user_id

    blob.update_columns(pod_id: id, user_id: owner_id)
  end

  def avatar_data
    return nil if avatar.blob.nil?

    {
      url: avatar.blob.real_url,
      download_url: avatar.blob.real_url(disposition: 'attachment'),
      signed_id: avatar.blob.signed_id,
    }
  end

  def self.domain_available?(domain)
    instance = new
    instance.domain = domain

    return { success: true, message: 'ok' } if instance.valid?

    errors = instance.errors[:domain]

    if errors.blank?
      { success: true, message: 'ok' }
    else
      { success: false, message: errors.first }
    end
  end

  ANONYMOUS_CONTEXT = {
    'domain' => ANONYMOUS_DOMAIN,
    'id' => nil,
  }

  def ensure_owner_member!
    members.find_or_create_by!(user_id: owner_id) do |member|
      member.role = :admin
    end
  end

  def hashed_id
    Brickdoc::Crypto.int_id_obfuscate(id)
  end

  def as_session_context
    attributes.slice('id', 'domain', 'owner_id').merge('id_hash' => hashed_id)
  end

  def generate_invite_secret
    secret = Digest::SHA256.hexdigest("#{id}-#{Time.now.to_i}-#{Brickdoc::Crypto.derive_key(:hash_salt)}")
    "#{secret[0...16]}#{hashed_id}#{secret[60..64]}"
  end

  def set_invite_secret
    if invite_enable
      self.invite_secret = generate_invite_secret if invite_secret.blank?
    else
      self.invite_secret = nil
    end
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
