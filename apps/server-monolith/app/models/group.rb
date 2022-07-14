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
class Group < Pod
  include GroupInviteable

  has_many :members, -> { enabled }, class_name: 'Groups::Member', inverse_of: :group, dependent: :destroy
  has_many :all_members, class_name: 'Groups::Member', inverse_of: :group, dependent: :destroy
  has_one :owner_member, -> { where(role: :owner).enabled }, class_name: 'Groups::Member', inverse_of: :group, dependent: :destroy
  has_many :users, through: :members
  has_one :owner, through: :owner_member, source: :user
  has_many :share_links, dependent: :restrict_with_exception, foreign_key: :pod_id, inverse_of: :pod, class_name: 'Docs::ShareLink'

  validates :owner_id, presence: true, on: :create

  def config
    MashcardConfig.at(pod_id: id)
  end

  attr_accessor :owner_id

  after_create :maybe_persist_owner!

  def destroy_group!
    ActiveRecord::Base.transaction do
      share_links.destroy_all
      update!(invite_enable: nil, invite_secret: nil)
      # all validatrs and callbacks are skipped
      update_columns(
        name: "delete group #{hashed_id}",
        domain: "deleted_group_#{hashed_id}",
        bio: "masked username #{username.to_data_masking} has ben deleted",
        deleted_at: Time.current
      )
      true
    end
  end

  private

  def maybe_persist_owner!
    Groups::Member.find_or_create_by!(user_id: owner_id, group_id: id, role: :owner)
  end
end
