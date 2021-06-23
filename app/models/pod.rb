# frozen_string_literal: true

# == Schema Information
#
# Table name: pods
#
#  id                                                           :bigint           not null, primary key
#  avatar_uri(object key for bucket or url that stored avatar.) :string(128)
#  bio("Bio" means Biography in social media.)                  :string(140)
#  deleted_at                                                   :datetime
#  name                                                         :string           not null
#  personal                                                     :boolean          default(FALSE), not null
#  webid                                                        :string           not null
#  created_at                                                   :datetime         not null
#  updated_at                                                   :datetime         not null
#  owner_id                                                     :bigint           not null
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

  def avatar
    avatar_uri
  end

  def self.webid_available?(webid)
    instance = new
    instance.webid = webid
    instance.valid?
    instance.errors[:webid].blank?
  end
end
