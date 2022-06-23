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
class User < Pod
  def config
    MashcardConfig.at(user_id: id)
  end

  delegate :timezone, to: :config
  delegate :locale, to: :config

  has_one :authentication, class_name: 'Users::Authentication', dependent: :destroy, inverse_of: :user
  has_one :personal_pod, class_name: 'Pod', foreign_key: 'id', dependent: :destroy, inverse_of: false
  has_one :owner, class_name: 'User', foreign_key: 'id', dependent: :destroy, inverse_of: false

  has_many :group_members, -> { enabled }, class_name: 'Groups::Member', dependent: :destroy, inverse_of: :user
  has_many :groups, through: :group_members
  has_many :owned_group_members, -> { where(role: :owner).enabled }, class_name: 'Groups::Member', dependent: :destroy, inverse_of: :user
  has_many :owned_groups,
    # don't destroy the user if it is owner of a group
    through: :owned_group_members, source: :group, dependent: :restrict_with_exception

  attr_accessor :current_pod_id, :current_pod_cache

  def fetch_current_pod_cache
    return current_pod_cache if current_pod_cache

    current_pod_cache = guess_pod
    current_pod_cache
  end

  def guess_pod
    return personal_pod if last_pod_username.nil?

    pods.find { |p| p.username === last_pod_username } || personal_pod
  end

  def save_last_position!(last_username, block_id)
    return true if last_pod_username == last_username && last_block_ids[last_username] == block_id

    # key not found
    unless last_block_ids.key?(last_username)
      # skip if username not found
      return false unless pods.find { |p| p.username === last_username }
    end

    update!(last_pod_username: last_username, last_block_ids: last_block_ids.merge(last_username => block_id))
  end

  def as_global_context
    { username: username, display_name: display_name }
  end

  def has_group_pods?
    groups.count > 0
  end

  def create_own_group!(attrs)
    owned_groups.create!(attrs.merge(owner_id: id))
  end

  # All pods that the user is a owner of
  def own_pods
    [self] + owned_groups.to_a
  end

  def pods(includes = nil)
    [self] + groups.includes(includes).to_a
  end

  def destroy_user!
    if has_group_pods?
      errors.add(:base, ::I18n.t('errors.messages.delete_disabled_because_group_pods'))
      return false
    end

    ActiveRecord::Base.transaction do
      authentication&.destroy_authentication!
      destroy!
      true
    end
  end
end
