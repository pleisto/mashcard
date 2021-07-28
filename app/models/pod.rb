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

  default_value_for :personal, false

  has_one_attached :avatar

  def self.url_helper
    @url_helper ||= Rails.application.routes.url_helpers
  end

  def self.import_avatar(url)
    return nil if url.blank?
    # rubocop:disable Security/Open
    io = URI.open(url)
    filename = File.basename(URI.parse(url).path)
    blob = ActiveStorage::Blob.create_and_upload!(io: io, service_name: :local, filename: filename)
    blob.signed_id
  end

  ## NOTE persist pod_id and user_id
  def fix_avatar!
    blob = avatar.blob
    return if blob.nil?
    return if blob.pod_id && blob.user_id

    blob.update_columns(pod_id: id, user_id: owner_id)
  end

  def avatar_url
    blob = avatar.blob
    return nil if blob.nil?
    public = ActiveStorage::Blob.services.fetch(blob.service_name)
    filename = blob.filename_in_database.presence || "unknown"
    signed_id = blob.signed_id

    if public
      ## NOTE CDN
      self.class.url_helper.rails_service_blob_proxy_url(filename: filename, signed_id: signed_id)
    else
      self.class.url_helper.rails_service_blob_url(filename: filename, signed_id: signed_id)
    end
  end

  def self.webid_available?(webid)
    instance = new
    instance.webid = webid
    instance.valid?
    instance.errors[:webid].blank?
  end

  def as_session_context
    attributes.slice('id', 'webid')
  end
end
