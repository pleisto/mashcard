# frozen_string_literal: true

# == Schema Information
#
# Table name: pods
#
#  id                                          :bigint           not null, primary key
#  bio("Bio" means Biography in social media.) :string(140)
#  deleted_at                                  :datetime
#  name                                        :string           not null
#  personal                                    :boolean          default(FALSE), not null
#  webid                                       :string           not null
#  created_at                                  :datetime         not null
#  updated_at                                  :datetime         not null
#  owner_id                                    :bigint           not null
#
# Indexes
#
#  index_pods_on_deleted_at        (deleted_at)
#  index_pods_on_lower_webid_text  (lower((webid)::text)) UNIQUE
#  index_pods_on_owner_id          (owner_id)
#
class Pod < ApplicationRecord
  belongs_to :owner, class_name: 'Accounts::User'
  validates :webid, presence: true, webid: true, uniqueness: { case_sensitive: false }
  validates :name, presence: true
  validates_presence_of :name
  validates_uniqueness_of :owner_id, scope: :personal, if: proc { personal? }
  has_many :blocks, class_name: 'Docs::Block'
  has_many :share_links, dependent: :restrict_with_exception, class_name: 'Docs::ShareLink'

  ANYONE_WEBID = 'anyone'
  ANONYMOUS_WEBID = 'anonymous'

  default_value_for :personal, false

  delegate :email, to: :owner

  has_one_attached :avatar

  def self.import_avatar(url)
    return nil if url.blank?
    # rubocop:disable Security/Open
    io = URI.open(url)
    filename = File.basename(URI.parse(url).path)
    service_name = Rails.env.in?(["development", "test"]) ? :local_public : :amazon_public
    key = "global/#{ActiveStorage::Blob.generate_unique_secure_token}_#{filename}"
    blob = ActiveStorage::Blob.create_and_upload!(key: key, io: io, service_name: service_name, filename: filename)
    blob.signed_id
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
      signed_id: avatar.blob.signed_id
    }
  end

  def self.webid_available?(webid)
    instance = new
    instance.webid = webid

    return { success: true, message: "ok" } if instance.valid?

    errors = instance.errors[:webid]

    if errors.blank?
      { success: true, message: "ok" }
    else
      { success: false, message: errors.first }
    end
  end

  ANONYMOUS_CONTEXT = {
    'webid' => ANONYMOUS_WEBID
  }

  def as_session_context
    attributes.slice('id', 'webid', 'owner_id')
  end
end
